import { getSession } from '@auth0/nextjs-auth0';

import { getUserBySub } from '../db/getUserBySub';
import { getInvestorByUserId } from '../db/getInvestorByUserId';
import { getOperatorByUserId } from '../db/getOperatorByUserId';

export const getUserFromRequestData = async req => {
    const sessionData = getSession(req, {});

    let user = {};

    if (typeof sessionData?.user === 'object') {
        user = {
            ...sessionData?.user || {},
            first_name: sessionData?.user?.given_name || sessionData?.user?.['https://www.getbriidge.com/user_metadata']?.first_name,
            last_name: sessionData?.user?.family_name || sessionData?.user?.['https://www.getbriidge.com/user_metadata']?.last_name
        }
    }

    try {
        if (!user?.sub) {
            return null;
        }

        const userData = await getUserBySub(user?.sub);

        if (!userData?.id) {
            return {
                ...(user || {}),
                investorOpportunities: [],
                operatorOpportunities: [],
                registered: Boolean(userData?.id)
            };
        }

        const results = await Promise.allSettled([getInvestorByUserId(userData?.id, true), getOperatorByUserId(userData?.id, true)]);

        return {
            ...(userData || user || {}),
            investorOpportunities: results?.[0]?.value || [],
            operatorOpportunities: results?.[1]?.value || [],
            registered: Boolean(userData?.id)
        }
    } catch (e) {

        console.log(e.message);

        throw e;
    }
}
