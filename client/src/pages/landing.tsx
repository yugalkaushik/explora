import Head from 'next/head';
import Hero from '@/components/Hero'

const Landing = () => {
  return (
    <>
      <Head>
        <title>TravelMate</title>
        <meta name="description" content="Plan your perfect travel journey." />
      </Head>
      <main className='pt-8'>
        <Hero />
      </main>
    </>
  );
};

export default Landing;
