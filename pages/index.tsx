import Head from "next/head";
import type { NextPage } from "next";

import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Nuza | Home</title>
        <meta
          content="Phone number tokenization for the masses."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="flex flex-col gap-5"></main>
    </Layout>
  );
};

export default Home;
