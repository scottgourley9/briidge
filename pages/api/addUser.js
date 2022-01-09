import { addUser } from '../../db/addUser';
import { addInvestor } from '../../db/addInvestor';
import { addOperator } from '../../db/addOperator';
import { getUserByEmail } from '../../db/getUserByEmail';
import { getInvestorByUserId } from '../../db/getInvestorByUserId';
import { getOperatorByUserId } from '../../db/getOperatorByUserId';
import { updateUserById } from '../../db/updateUserById';
import { updateInvestorByUserId } from '../../db/updateInvestorByUserId';
import { updateOperatorByUserId } from '../../db/updateOperatorByUserId';

export default async function handler(req, res) {
    try {
        const existingUser = await getUserByEmail(req?.body?.user?.email);
        let addedUserId;
        if (!existingUser) {
            addedUserId = await addUser(req.body);
        } else {
            const updatedUser = await updateUserById(existingUser, req.body);
            addedUserId = updatedUser?.id;
        }

        if (addedUserId) {
            if (req?.body?.onBoardState?.type === 'investor') {
                const existingInvestor = await getInvestorByUserId(addedUserId);
                if (!existingInvestor) {
                    await addInvestor(addedUserId, req.body);
                } else {
                    await updateInvestorByUserId(existingInvestor, req.body);
                }
            } else if (req?.body?.onBoardState?.type === 'operator') {
                const existingOperator = await getOperatorByUserId(addedUserId);
                if (!existingOperator) {
                    await addOperator(addedUserId, req.body);
                } else {
                    await updateOperatorByUserId(existingOperator, req.body);
                }
            }

            return res.status(200).json('user added/updated successfully');
        } else {
            return res.status(500).json('unable to add/update user');
        }
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
