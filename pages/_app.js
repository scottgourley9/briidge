// import { Fragment } from 'react';
// import Head from 'next/head';
// import Layout from '../components/Layout/Layout';
// import Nav from '../components/Nav/Nav';
// import Footer from '../components/Footer/Footer';

import FormInvestor from '../components/Form/FormInvestor';

import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
    // return (
        // <Fragment>
        //     <Head>
        //         <title>Briidge</title>
        //         <link rel="icon" href="/briidge.ico" />
        //         <meta name="description" content="" />
        //         <meta name="keywords" content="" />
        //     </Head>
        //     <Nav />
        //     <Layout>
        //         <Component {...pageProps} />
        //     </Layout>
        //     <Footer />
        // </Fragment>
    // )

    return <FormInvestor />
}

export default App
