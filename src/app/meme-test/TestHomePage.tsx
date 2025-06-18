"use client";

import ShareSection from "@/components/meme/shareSection";
import { useAnimatedCount } from "@/hooks/useAnimatedCount";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTypeRankQuery();
  const animatedCount = useAnimatedCount(data?.participantCount);

  if (isLoading)
    return <div className="mt-10 text-center font-medium">로딩 중...</div>;
  if (isError || !data)
    return <div className="mt-10 text-center">데이터 불러오기 실패</div>;

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
    <div className="flex h-full w-full flex-col bg-pink-200 px-0">
      <div className="flex items-start px-3">
        <img src="/assets/icons/logo.png" alt="logo" className="w-20" />
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
                <span className="mr-10 text-sm font-bold text-black">
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
    </div>
  );
}
