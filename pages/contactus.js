import { getUserFromRequestData } from '../helpers/getUserFromRequestData';

export const getServerSideProps = async ({ req }) => {
    try {
        const user = await getUserFromRequestData(req);

        return {
            props: { user: JSON.parse(JSON.stringify(user)) }
        };
    } catch (e) {
        return {
            props: { user: {} }
        };
    }
};

export { default } from '../components/ContactUs/ContactUs';
