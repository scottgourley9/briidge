import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../helpers/getUserFromRequestData';

import { OnBoardContextProvider } from '../components/OnBoard/StateProvider';
import OnBoard from '../components/OnBoard/OnBoard';

export const getServerSideProps = async ({ req }) => {
    try {
        const user = await getUserFromRequestData(req);

        if (!user) {
            // not logged in
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false
                }
            }
        }

        if (user && user?.registered) {
            // has registered take to profile page
            return {
                redirect: {
                    destination: `/profile/${user?.id}`,
                    permanent: false,
                }
            }
        }

        return {
            props: { user: JSON.parse(JSON.stringify(user)) }
        };
    } catch (e) {
        return {
            props: { user: {} }
        };
    }
};

const OnBoardWithContext = props => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <OnBoardContextProvider>
                <OnBoard {...props} />
            </OnBoardContextProvider>
        </QueryClientProvider>
    )
}

export default OnBoardWithContext;
