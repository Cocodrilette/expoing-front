import Head from "next/head";
import type { NextPage } from "next";

import { Layout } from "../components/Layout";
import { HeadingText } from "../components/heading-text";
import { Paragraph } from "../components/paragraph";
import Link from "next/link";

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
      <div className="flex flex-col justify-center items-center gap-5">
        <HeadingText
          className="text-center mt-10 max-w-2xl m-auto"
          primaryText="Tokenizing your"
          secondaryText="most used value"
        />
        <Paragraph className="text-center max-w-2xl mx-auto">
          Nuza is a service that allows you to tokenize your most used value,
          whether it be your phone number, email, or even your name. This allows
          you to share your information with others without having to worry
          about your information being leaked or sold to third parties.
        </Paragraph>
        <Link
          href="/auth/register"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        >
          Get started
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
