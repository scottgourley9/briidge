import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../helpers/getUserFromRequestData';
import { getAllInvestors } from '../db/getAllInvestors';

import Investors from '../components/Investors/Investors';

export const getServerSideProps = async ({ req }) => {
    try {
        const results = await Promise.allSettled([getUserFromRequestData(req), getAllInvestors(0, 5)]);

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
                investors: JSON.parse(JSON.stringify((results?.[1]?.value) || []))
            }
        };
    } catch (e) {
        return {
            props: { user: {} }
        };
    }
};

const InvestorsWithReactQuery = props => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Investors {...props} />
        </QueryClientProvider>
    )
}

export default InvestorsWithReactQuery;
