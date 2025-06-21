import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 비회원이 접근 시 로그인 페이지로 리디렉션해야 하는 경로들
  const protectedPaths = ["/chat", "/plan", "/nearby", "/plandetail"];

  // 현재 경로가 보호된 경로 중 하나로 시작하는지 확인
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    // 비회원일 경우 홈페이지로 리디렉션
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로를 지정
export const config = {
  matcher: [
    // 페이지 경로 (모든 페이지)
    "/chat/:path*",
    "/nearby/:path*",
    "/planlist/:path*",
    "/meme-test/:id", // meme-test/[id] 테스트 페이지만 제한

    // 인증이 필요한 API 경로
    "/api/chat-freetalk",
    "/api/chat-session/:path*",
    "/api/chat-summary",
    "/api/chatbot-plan",
    "/api/user/my-plan",
    "/api/user/set-my-plan",
    "/api/user/invite-multiple",
    "/api/user/tested-count",
    "/api/user-character-profile/:path*",
  ],
};
