import { Metadata } from "next";

export function generateMetadata({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}): Metadata {
  const inviterRaw = searchParams?.inviter;
  const inviterName =
    typeof inviterRaw === "string" ? decodeURIComponent(inviterRaw) : "";

  return {
    title: "MZ 성향 테스트하기!",
    openGraph: {
      title: "MZ 성향 테스트하기!",
      description: inviterName
        ? `${inviterName}님의 성향을 확인해보세요!`
        : "성향 테스트 결과를 확인해보세요!",
      url: "https://moo-mool.vercel.app/meme-test",
      images: [
        {
          url: "https://moo-mool.vercel.app/assets/icons/meme-test-home.png",
          width: 800,
          height: 600,
          alt: "밈 테스트 미리보기",
        },
      ],
      type: "website",
    },
  };
}
