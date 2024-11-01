import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
