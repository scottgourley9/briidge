import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getAllUserData } from '../../helpers/getAllUserData';
import { getUserFromRequestData } from '../../helpers/getUserFromRequestData';

import Profile from '../../components/Profile/Profile';

export const getServerSideProps = async context => {
    try {
        const user = await getUserFromRequestData(context?.req);

        if (user && !user?.registered) {
            // has not registered yet
            return {
                redirect: {
                    destination: '/onboard',
                    permanent: false,
                }
            }
        }

        const { userId } = context?.query || {};
        if (user?.id == userId) {
            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                    profileUser: {},
                    isEditable: true
                }
            };
        } else {
            const profileUser = await getAllUserData(userId);

            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                    profileUser: JSON.parse(JSON.stringify(profileUser)),
                    isEditable: false
                }
            };
        }
    } catch (e) {
        console.log(e);

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
