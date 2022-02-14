import { Fragment, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';

// import FormInvestor from '../components/Form/FormInvestor';

import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
    console.log(pageProps);
    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            window.scrollTo(0, 0);
        });
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Briidge</title>
                <link rel="icon" href="/briidge.ico" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <Nav {...pageProps} />
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Footer />
        </Fragment>
    )
}

export default App
