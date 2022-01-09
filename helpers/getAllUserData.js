import { getUserById } from '../db/getUserById';
import { getInvestorByUserId } from '../db/getInvestorByUserId';
import { getOperatorByUserId } from '../db/getOperatorByUserId';

export const getAllUserData = userId => {
    try {
        const userData = await getUserById(user?.email);

        const results = await Promise.allSettled([getInvestorByUserId(userData?.id), getOperatorByUserId(userData?.id)]);

        return {
            ...(userData || {}),
            investor: {
                ...(results?.[0]?.value || {})
            },
            operator: {
                ...(results?.[1]?.value || {})
            }
        }
    } catch (e) {

        console.log(e.message);

        throw e;
    }
}
