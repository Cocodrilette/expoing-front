import type { NextPage } from "next";

import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Paragraph } from "../../../components/paragraph";
import { HeadingText2 } from "../../../components/heading-text-2";

const Loggin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { isConnected: isWalletConnected, address } = useAccount();

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email,
      password,
      address,
    });

    console.log({ data });

    console.log("form data");
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      conditionsAcepeted: data.get("conditionsAcepeted"),
      address,
    });
  }

  useEffect(() => setIsMounted(true), []);

  return (
    <Layout>
      <Head>
        <title>Nuza | Register</title>
        <meta content="" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {!isMounted && <Paragraph>Loading...</Paragraph>}
      {isMounted && (
        <form
          className="mx-auto shadow-md p-5 md:p-10"
          onSubmit={handleFormSubmit}
        >
          {isWalletConnected ? (
            <>
              {" "}
              <div className="grid gap-6 md:grid-cols-1">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="john.doe@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit
              </button>
              <Paragraph className="mt-6">
                Don't have an account?{" "}
                <Link
                  className="text-blue-700 hover:underline"
                  href="/auth/register"
                >
                  Register
                </Link>
              </Paragraph>
            </>
          ) : (
            <div className="p-5 md:max-w-xl flex flex-col gap-10">
              <HeadingText2>
                Please connect your wallet to continue
              </HeadingText2>
              <ConnectButton />
            </div>
          )}
        </form>
      )}
    </Layout>
  );
};

export default Loggin;
