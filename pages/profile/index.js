import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../../helpers/getUserFromRequestData';

import Profile from '../../components/Profile/Profile';

export const getServerSideProps = async ({ req }) => {
    try {
        const user = await getUserFromRequestData(req);

        if (!user) {
            // not logged in
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
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
                isEditable: true
            }
        };
    } catch (e) {
        return {
            props: {
                user: {},
                profileUser: {},
                isEditable: false
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
