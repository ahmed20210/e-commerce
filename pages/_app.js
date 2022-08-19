import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/globalstore'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
function MyApp({ Component, pageProps }) {

  return <Provider store={store}>
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
}

export default MyApp
