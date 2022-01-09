import { getSession } from '@auth0/nextjs-auth0';

import { getUserByEmail } from '../db/getUserByEmail';
import { getInvestorByUserId } from '../db/getInvestorByUserId';
import { getOperatorByUserId } from '../db/getOperatorByUserId';

export const getUserFromRequestData = async req => {
    const sessionData = getSession(req, {});

    const user = {
        ...sessionData?.user || {},
        first_name: sessionData?.user?.given_name || sessionData?.user?.['https://www.getbriidge.com/user_metadata']?.first_name,
        last_name: sessionData?.user?.family_name || sessionData?.user?.['https://www.getbriidge.com/user_metadata']?.last_name
    }

    try {
        if (!user?.email) {
            return {
                investor: {},
                operator: {}
            }
        }

        const userData = await getUserByEmail(user?.email);

        if (!userData?.id) {
            return {
                ...(user || {}),
                investor: {},
                operator: {}
            }
        }

        const results = await Promise.allSettled([getInvestorByUserId(userData?.id), getOperatorByUserId(userData?.id)]);

        return {
            ...(userData || user || {}),
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
