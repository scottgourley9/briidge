import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../helpers/getUserFromRequestData';
import { getAllOperators } from '../db/getAllOperators';

import Operators from '../components/Operators/Operators';

export const getServerSideProps = async ({ req }) => {
    try {
        const results = await Promise.allSettled([getUserFromRequestData(req), getAllOperators(0, 5)]);

        if (results?.[0]?.value && !results?.[0]?.value?.registered) {
            // has not registered yet
            return {
                redirect: {
                    destination: '/onboard',
                    permanent: false,
                }
            }
        }

        if (!results?.[0]?.value || !Object.keys(results?.[0]?.value || {}).length) {
            // not logged in
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

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

const OperatorsWithReactQuery = props => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Operators {...props} />
        </QueryClientProvider>
    )
}

export default OperatorsWithReactQuery;
