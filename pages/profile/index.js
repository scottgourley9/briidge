import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../../helpers/getUserFromRequestData';

import Profile from '../../components/Profile/Profile';

export const getServerSideProps = async ({ req }) => {
    const startTime = (new Date()).getTime();
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

        if (user && !user?.registered) {
            // has not registered yet
            return {
                redirect: {
                    destination: '/onboard',
                    permanent: false,
                }
            }
        }

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                profileUser: {},
                isEditable: true,
                referer: req?.headers?.referer || null
            }
        };
    } catch (e) {
        return {
            props: {
                user: {},
                profileUser: {},
                isEditable: false,
                referer: req?.headers?.referer || null
            }
        };
    }
};

const ProfileWithContext = props => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
                <Profile {...props} />
        </QueryClientProvider>
    )
}

export default ProfileWithContext;
