import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Layout } from "../../../components/Layout";
import { Paragraph } from "../../../components/paragraph";
import { HeadingText2 } from "../../../components/heading-text-2";

const Register: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [identification, setIdentification] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [conditionsAcepeted, setConditionsAccepted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const { isConnected: isWalletConnected, address } = useAccount();

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (confirmedPassword !== password) {
      return setError({
        show: true,
        message: "Passwords don't match",
      });
    }

    const data = {
      name: userName,
      email,
      password,
      address,
      identification,
    };

    console.log({ data });

    setSubmitting(true);

    setError({
      show: false,
      message: "",
    });

    try {
      await axios.post("/api/auth/register", data);

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
      setIdentification("");
      setConditionsAccepted(false);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError({
        show: true,
        message: "Something went wrong",
      });
    }

    setSubmitting(false);
  }

  async function checkUser() {
    const userExists = await axios.get(`api/auth/exists/${address}`);
    if (userExists) router.push("/dashboard");
  }

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    console.log("cehc");

    if (isWalletConnected) checkUser();
  }, [isWalletConnected]);

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
                    value={userName}
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
                    value={email}
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
                  onChange={(e) => setIdentification(e.target.value)}
                  type="text"
                  id="idenfication"
                  value={identification}
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
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  autoComplete="password"
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
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  type="password"
                  id="confirmedPassword"
                  value={confirmedPassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  autoComplete="password"
                  required
                />
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    onChange={(e) => setConditionsAccepted(e.target.checked)}
                    id="conditionsAcepeted"
                    type="checkbox"
                    checked={conditionsAcepeted}
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
                {submitting ? "Submitting..." : "Register"}
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

export default Register;
