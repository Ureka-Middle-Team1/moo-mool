"use client";

import ShareSection from "@/components/meme/shareSection";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { useUpdateTestedCount } from "@/hooks/useUpdateTestedCount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTypeRankQuery();
  if (isLoading)
    return <div className="mt-10 text-center font-medium">로딩 중...</div>;
  if (isError || !data)
    return <div className="mt-10 text-center">데이터 불러오기 실패</div>;

  const topMoonos = (data?.moonos ?? [])
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 2);
  console.log("Top Moonos:", topMoonos);

  const handleStart = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    router.push(`/meme-test/${randomId}`);
  };

  return (
    <div className="flex h-full w-full flex-col bg-pink-200 px-0">
      {/* 상단 로고 영역 */}
      <div className="flex items-start px-3">
        <img src="/assets/icons/logo.png" alt="logo" className="w-24" />
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <img
          src="/assets/icons/meme-test-home.png"
          alt="home"
          className="w-[80%]"
        />

        <button
          onClick={handleStart}
          className="mb-4 w-4/5 max-w-[250px] cursor-pointer rounded-lg bg-pink-400 px-6 py-2 text-lg text-white shadow-md transition hover:bg-yellow-500">
          시작하기
        </button>

        <div className="text-center">
          <p className="text-lg font-medium text-black">참여자 수</p>
          <p className="text-lg font-medium text-black">
            {data.participantCount}
          </p>
        </div>

        <hr className="my-3 w-[90%] border border-pink-400" />

        {session?.user?.id && (
          <ShareSection
            title="테스트 공유하기"
            count={data.sharedCount}
            id={session.user.id}
            shareUrl="/meme-test"
          />
        )}

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
                <p className="text-sm font-medium text-black">{moono.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
