import { getUserFromRequestData } from '../helpers/getUserFromRequestData';
import { getAllOperators } from '../db/getAllOperators';

export const getServerSideProps = async ({ req }) => {
    try {
        const results = await Promise.allSettled([getUserFromRequestData(req), getAllOperators(0, 10)]);

        return {
            props: {
                user: JSON.parse(JSON.stringify((results?.[0]?.value) || {})),
                operators: JSON.parse(JSON.stringify((results?.[1]?.value) || []))
            }
        };
    } catch (e) {
        return {
            props: { user: {} }
        };
    }
};

export { default } from '../components/Operators/Operators';
