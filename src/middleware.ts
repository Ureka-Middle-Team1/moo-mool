import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 인증이 필요한 모든 경로 (페이지 + API)에 대해 토큰 유무를 먼저 검사
  if (!token) {
    // 1. 비로그인 상태에서 API 접근 시, 401 에러를 JSON으로 반환
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. 비로그인 상태에서 보호된 페이지 접근 시, 홈페이지로 리디렉션
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 인증된 사용자는 요청을 그대로 통과
  return NextResponse.next();
}

// 미들웨어를 적용할 경로를 지정
export const config = {
  matcher: [
    // 페이지 경로 (모든 페이지)
    "/chat/:path*",
    "/nearby/:path*",
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
