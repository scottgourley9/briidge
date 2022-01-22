import { addUser } from '../../db/addUser';
import { addInvestor } from '../../db/addInvestor';
import { addOperator } from '../../db/addOperator';
import { getUserBySub } from '../../db/getUserBySub';
import { getInvestorByUserId } from '../../db/getInvestorByUserId';
import { getOperatorByUserId } from '../../db/getOperatorByUserId';
import { updateUserById } from '../../db/updateUserById';
import { updateInvestorById } from '../../db/updateInvestorById';
import { updateOperatorById } from '../../db/updateOperatorById';

export default async function handler(req, res) {
    try {
        const existingUser = await getUserBySub(req?.body?.user?.sub);
        let addedUserId;
        if (!existingUser) {
            addedUserId = await addUser(req.body);
        } else {
            const updatedUser = await updateUserById({
                ...existingUser,
                ...(req.body?.user || {}),
                ...(req.body?.onBoardState || {})
            });
            addedUserId = updatedUser?.id;
        }

        if (addedUserId) {
            if (req?.body?.onBoardState?.type === 'investor') {
                const existingInvestor = await getInvestorByUserId(addedUserId);
                if (!existingInvestor) {
                    await addInvestor(addedUserId, req?.body?.onBoardState?.investor);
                } else {
                    await updateInvestorById(existingInvestor?.id, req?.body?.onBoardState?.investor);
                }
            } else if (req?.body?.onBoardState?.type === 'operator') {
                const existingOperator = await getOperatorByUserId(addedUserId);
                if (!existingOperator) {
                    await addOperator(addedUserId, req?.body?.onBoardState?.operator);
                } else {
                    await updateOperatorById(existingOperator?.id, req?.body?.onBoardState?.operator);
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
