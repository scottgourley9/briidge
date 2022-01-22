import { getUserById } from '../db/getUserById';
import { getInvestorByUserId } from '../db/getInvestorByUserId';
import { getOperatorByUserId } from '../db/getOperatorByUserId';

export const getAllUserData = async userId => {
    try {
        const results = await Promise.allSettled([getUserById(userId), getInvestorByUserId(userId, true), getOperatorByUserId(userId, true)]);

        return {
            ...(results?.[0]?.value || {}),
            investorOpportunities: results?.[1]?.value || [],
            operatorOpportunities: results?.[2]?.value || []
        }
    } catch (e) {
        console.log(e.message);
        throw e;
    }
}
