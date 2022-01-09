import { getUserFromRequestData } from '../helpers/getUserFromRequestData';
import { getAllInvestors } from '../db/getAllInvestors';

export const getServerSideProps = async ({ req }) => {
    try {
        const results = await Promise.allSettled([getUserFromRequestData(req), getAllInvestors(0, 10)])

        return {
            props: {
                user: JSON.parse(JSON.stringify((results?.[0]?.value) || {})),
                investors: JSON.parse(JSON.stringify((results?.[1]?.value) || []))
            }
        };
    } catch (e) {
        return {
            props: { user: {} }
        };
    }
};

export { default } from '../components/Investors/Investors';
