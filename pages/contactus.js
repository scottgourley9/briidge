import { getSession } from '@auth0/nextjs-auth0';

export const getServerSideProps = ({ req }) => {
    const sessionData = getSession(req, {});

    return {
        props: { user: sessionData?.user || {} }
    };
};

export { default } from '../components/ContactUs/ContactUs';
