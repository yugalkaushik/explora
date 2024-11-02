import Head from "next/head";
import Hero from "@/components/Hero";
import Blogs from "@/components/Blogs";

const Landing = () => {
  return (
    <>
      <Head>
        <title>explora</title>
        <meta name="description" content="Plan your perfect travel journey." />
      </Head>
      <main className="pt-8">
        <Hero />
        <Blogs />
      </main>
    </>
  );
};

export default Landing;
