import { getUserFromRequestData } from '../helpers/getUserFromRequestData';

export const getServerSideProps = async ({ req }) => {
    try {
        const user = await getUserFromRequestData(req);

        if (user?.email && !Object.keys(user?.investor || {}).length && !Object.keys(user?.operator || {}).length) {
            // has not registered yet
            return {
                redirect: {
                    destination: '/onboard',
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

export { default } from '../components/Home/Home';
