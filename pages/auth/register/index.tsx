import type { NextPage } from "next";

import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Paragraph } from "../../../components/paragraph";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HeadingText2 } from "../../../components/heading-text-2";

const Loggin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [conditionsAcepeted, setConditionsAccepted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const { isConnected: isWalletConnected, address } = useAccount();

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (confirmedPassword !== password) {
      return setError({
        show: true,
        message: "Passwords don't match",
      });
    }

    console.log({
      userName,
      email,
      password,
      confirmedPassword,
      conditionsAcepeted,
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
      {!isMounted && <Paragraph className="text-center">Loading...</Paragraph>}
      {isMounted && (
        <form
          className="max-w-xl mx-auto shadow-md p-5 md:p-10"
          onSubmit={handleFormSubmit}
        >
          {isWalletConnected ? (
            <>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="John"
                    autoComplete="name"
                    required
                  />
                </div>
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
                  htmlFor="idenfication"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Identification
                </label>
                <input
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  type="text"
                  id="idenfication"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="XXX-XXXX-XXX"
                  autoComplete="identification"
                  required
                />
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
                  placeholder="1234-5678-9012"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmedPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="confirmedPassword"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  required
                />
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    onChange={(e) => setConditionsAccepted(e.target.checked)}
                    id="conditionsAcepeted"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                  />
                </div>
                <label
                  htmlFor="conditionsAcepeted"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <Link href="" className="text-blue-600 hover:underline">
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
              <button
                disabled={!conditionsAcepeted}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit
              </button>
              <Paragraph className="mt-6">
                Already have an account?{" "}
                <Link
                  className="text-blue-700 hover:underline"
                  href="/auth/login"
                >
                  Login
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
          <div className={`${!error.show && "hidden"}`}>
            <Paragraph className="text-red-500">{error.message}</Paragraph>
          </div>
        </form>
      )}
    </Layout>
  );
};

export default Loggin;
