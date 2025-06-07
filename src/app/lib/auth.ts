import Kakao from "next-auth/providers/kakao";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

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
        console.log("kakao login profile : ", profile);
        return {
          id: profile.id,
          name: profile.properties?.nickname,
          email: profile.kakao_account?.email,
          image: profile.properties?.profile_image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
        session.user.name = user.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
