import { getSession } from '@auth0/nextjs-auth0';

import { getUserBySub } from '../db/getUserBySub';
import { getInvestorByUserId } from '../db/getInvestorByUserId';
import { getOperatorByUserId } from '../db/getOperatorByUserId';

export const getUserFromRequestData = async req => {
    const startTime = (new Date()).getTime();

    console.log('getUserFromRequestData START');

    const sessionData = getSession(req, {});

    console.log('getUserFromRequestData getSession: ', (new Date()).getTime() - startTime);

    let user = {};

    if (typeof sessionData?.user === 'object') {
        user = {
            ...sessionData?.user || {},
            first_name: sessionData?.user?.given_name,
            last_name: sessionData?.user?.family_name
        }
    }

    try {
        if (!user?.sub) {
            return null;
        }

        const userData = await getUserBySub(user?.sub);

        console.log('getUserFromRequestData getUserBySub: ', (new Date()).getTime() - startTime);

        if (!userData?.id) {
            return {
                ...(user || {}),
                investorOpportunities: [],
                operatorOpportunities: [],
                registered: Boolean(userData?.id)
            };
        }

        if (/profile/gi.test(req?.url)) {
            const results = await Promise.allSettled([getInvestorByUserId(userData?.id, true), getOperatorByUserId(userData?.id, true)]);

            console.log('getUserFromRequestData allPromises: ', (new Date()).getTime() - startTime);

            return {
                ...(userData || user || {}),
                investorOpportunities: results?.[0]?.value || [],
                operatorOpportunities: results?.[1]?.value || [],
                registered: Boolean(userData?.id)
            }
        }

        console.log('getUserFromRequestData END: ', (new Date()).getTime() - startTime);

        return {
            ...(userData || user || {}),
            registered: Boolean(userData?.id)
        }
    } catch (e) {

        console.log(e.message);

        throw e;
    }
}
