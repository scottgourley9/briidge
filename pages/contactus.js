import {
   QueryClient,
   QueryClientProvider
 } from 'react-query'

import { getUserFromRequestData } from '../helpers/getUserFromRequestData';

import ContactUs from '../components/ContactUs/ContactUs';

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

const ContactUsWithReactQuery = props => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ContactUs {...props} />
        </QueryClientProvider>
    )
}

export default ContactUsWithReactQuery;
