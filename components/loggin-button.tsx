import { signIn, signOut, useSession } from "next-auth/react";
import { Paragraph } from "./paragraph";

export function LogginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Paragraph>Signed in as {session.user?.email}</Paragraph>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <Paragraph>Not signed in</Paragraph> <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
