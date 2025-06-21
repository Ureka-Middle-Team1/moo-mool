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

// 미들웨어를 적용할 경로를 지정합니다.
export const config = {
  matcher: [
    /*
     * 아래와 일치하는 경로를 제외한 모든 요청 경로에서 미들웨어를 실행합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
