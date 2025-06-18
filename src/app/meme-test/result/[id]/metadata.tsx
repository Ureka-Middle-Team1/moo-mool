import { Metadata } from "next";
import { decrypt } from "@/utils/crypto";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const userId = decrypt(decodeURIComponent(params.id));
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  return {
    title: "MZ 성향 테스트하기!",
    openGraph: {
      title: "MZ 성향 테스트하기!",
      description: user?.name
        ? `${user.name}님의 성향을 확인해보세요!`
        : "성향 테스트 결과를 확인해보세요!",
      url: `https://moo-mool.vercel.app/meme-test/result/${params.id}`,
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
