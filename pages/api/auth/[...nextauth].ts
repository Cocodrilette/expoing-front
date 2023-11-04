import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  providers: [EmailProvider({})],
};

export default NextAuth(authOptions);
