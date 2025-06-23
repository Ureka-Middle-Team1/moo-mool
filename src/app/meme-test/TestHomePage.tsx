"use client";

import HomeHeader from "@/components/home/HomeHeader";
import ShareSection from "@/components/meme/shareSection";
import { useAnimatedCount } from "@/hooks/useAnimatedCount";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GlobalLoading from "@/app/loading";
import NoResultMessage from "@/components/meme/NoResultMessage";

export default function TestHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTypeRankQuery();
  const animatedCount = useAnimatedCount(data?.participantCount);

  if (isLoading) return <GlobalLoading />;
  if (isError || !data)
    return (
      <NoResultMessage
        message="데이터를 불러오는 데 실패했습니다."
        subMessage={`네트워크 상태를 확인하거나,\n잠시 후 다시 시도해 주세요.`}
        buttonText="홈으로"
        buttonAction={() => router.push("/home")}
        imageSrc="/assets/moono/404-moono.png"
      />
    );

  const topMoonos = (data?.moonos ?? [])
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 2);

  const handleStart = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    const callbackUrl = `/meme-test/${randomId}`;

    if (!session) {
      signIn("kakao", { callbackUrl });
    } else {
      router.push(`/meme-test/${randomId}`);
    }
  };

  return (
    <div className="flex h-full flex-col items-center bg-pink-200">
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <HomeHeader />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <img
            src="/assets/icons/meme-test-home.png"
            alt="home"
            className="w-[90%]"
          />

          <button
            onClick={handleStart}
            className="mb-5 w-[40%] cursor-pointer rounded-lg bg-pink-400 px-6 py-2 text-lg font-semibold text-white shadow-md transition hover:bg-yellow-500">
            시작하기
          </button>

          <div className="text-center">
            <p className="mb-2 text-xl font-bold text-black">
              <span className="relative z-10 inline-block">
                <span
                  className="absolute bottom-[0.3em] left-0 -z-10 h-[0.26em] w-full bg-yellow-500"
                  aria-hidden="true"
                />
                참여자 수
              </span>
            </p>
            <p className="text-2xl font-bold text-black">
              {animatedCount.toLocaleString("ko-KR")}
            </p>
          </div>

          <hr className="my-5 w-[90%] border border-pink-400" />

          <ShareSection
            title="테스트 공유하기"
            count={data.sharedCount ?? 0}
            id={session?.user.id ?? 0}
            shareUrl="/meme-test"
          />

          <div className="mb-8 flex w-[90%] flex-col gap-4 rounded-lg border-1 border-pink-400 bg-white p-4 shadow-md">
            {topMoonos.map((moono, index) => (
              <div key={index} className="flex w-full">
                <div className="ml-10 flex w-1/2 items-center justify-start">
                  <div className="mr-5 h-7 w-1 bg-pink-400"></div>
                  <span className="mr-5 text-sm font-bold whitespace-nowrap text-black">
                    {index + 1}등
                  </span>
                  <img
                    src={`/assets/moono/${moono.image}.png`}
                    alt={moono.label}
                    className="ml-3 h-12 w-12"
                  />
                </div>
                <div className="flex w-1/2 items-center justify-center pr-3">
                  <p className="text-sm font-semibold text-black">
                    {moono.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
