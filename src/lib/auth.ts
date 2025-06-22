import Kakao from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "account_email profile_nickname profile_image",
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.properties?.nickname as string,
          email: profile.kakao_account?.email as string,
          image: profile.properties?.profile_image as string,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
