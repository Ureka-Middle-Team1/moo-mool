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
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
