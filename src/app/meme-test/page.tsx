// ✅ /src/app/meme-test/page.tsx
import { Metadata } from "next";
import TestHomePage from "./TestHomePage";

export function generateMetadata(): Metadata {
  return {
    title: "MZ 성향 테스트하기!",
    openGraph: {
      title: "MZ 성향 테스트하기!",
      description: "성향 테스트 결과를 확인해보세요!",
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

export default function Page() {
  return <TestHomePage />;
}
