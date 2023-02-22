import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import { AdapterUser } from "next-auth/adapters";

export const authOption = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
    async session({
      session,
      user,
    }: {
      session: Session;
      user: User | AdapterUser;
    }) {
      if (session?.user) session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOption);
