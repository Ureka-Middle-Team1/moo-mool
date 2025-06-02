import Kakao from "next-auth/providers/kakao";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
};
