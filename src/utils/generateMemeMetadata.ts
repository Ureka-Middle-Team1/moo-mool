import { Metadata } from "next";

export function generateMemeMetadata(inviter?: string | string[]): Metadata {
  const inviterName =
    typeof inviter === "string" ? decodeURIComponent(inviter) : "";

  return {
    title: "MZ 성향 테스트하기!",
    openGraph: {
      title: "MZ 성향 테스트하기!",
      description: inviterName
        ? `${inviterName}님의 성향을 확인해보세요!`
        : "성향 테스트 결과를 확인해보세요!",
      url: "https://moo-mool-one.vercel.app/meme-test",
      images: [
        {
          url: "https://moo-mool-one.vercel.app/assets/icons/meme-test-home.png",
          width: 800,
          height: 600,
          alt: "밈 테스트 미리보기",
        },
      ],
      type: "website",
    },
  };
}
