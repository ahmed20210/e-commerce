import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/globalstore'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NProgress from 'nprogress'
import {useEffect} from 'react'
import Router from 'next/router'
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <title>E-commerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="E-commerce" />
        <meta name="keywords" content="E-commerce" />
        <meta name="author" content="E-commerce" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp
