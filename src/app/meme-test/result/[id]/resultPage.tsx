"use client";


import React, { useEffect } from "react";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import { decrypt } from "@/utils/crypto";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { getMemeTypeLabel, MemeType, memeTypeData } from "@/store/memeTypeData";
import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";
import { useRouter } from "next/navigation";
import Header from "@/components/meme/Header";
import SuspenseImage from "@/components/meme/SuspenseImage";
import { useChatStore } from "@/store/useChatStore";
import { useSixTypeRecommendPlan } from "@/hooks/useSixTypeRecommendPlan";
import PlanCard from "@/components/chat/PlanCard";

export default function ResultPage({ encryptedId }: { encryptedId: string }) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();
  const { messages } = useChatStore(); // chatStore에 있는 정보 불러올 것임 (거기에 정보가 저장될 테니까요)
  const {
    mutate: fetchRecommendPlan,
    isPending,
    error,
  } = useSixTypeRecommendPlan();

  const decryptedId = encryptedId
    ? decrypt(decodeURIComponent(encryptedId))
    : null;

  // 요금제 추천 카드 (맨 첫번째 것만 찾는다)
  const firstPlanMessage = messages.find(
    (msg) => msg.planData && msg.type === "plan"
  );

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserInfo(decryptedId || "");


  // 최초 렌더링 시에 DB로부터 결과 받아오기
  useEffect(() => {
    fetchRecommendPlan();
  }, []);

  if (!encryptedId || !decryptedId) {
    return <p>잘못된 접근입니다.</p>;
  }

  if (isUserLoading) {
    return <p className="text-center">사용자 정보를 불러오는 중입니다...</p>;
  }

  if (isUserError || !user) {
    return (
      <p className="text-center">사용자 정보를 불러오는 데 실패했습니다.</p>
    );
  }

  if (!user.characterProfile) {
    return (
      <p className="text-center">
        아직 테스트 결과가 없습니다. 테스트를 먼저 진행해주세요.
      </p>
    );
  }

  const type: MemeType = (user.characterProfile.type as MemeType) || "Saving";
  const { descriptionText, hashtagText } = memeTypeData[type];
  const splitSentences = parseSentences(descriptionText);
  const hashtags = parseHashtags(hashtagText);
  const matchedMeme = data?.moonos.find((item) => item.type === type);
  const percentValue = matchedMeme?.percent ?? 0;

  const handleNavigateToMemeTest = () => {
    router.push("/meme-test");
  };
  const handleOpenHomeInNewTab = () => {
    window.open("/", "_blank");
  };
  const handleNavigateToRankPage = () => {
    router.push("/meme-test/rank");
  };

  return (
    <div className="flex w-full flex-col bg-pink-200 px-0">
      <Header onBack={() => router.push("/meme-test")} />

      <main className="flex flex-col items-center gap-5 px-4 pt-6 pb-10 text-center">
        <div className="text-2xl font-bold">{getMemeTypeLabel(type)}</div>
        <div>
          전체 테스트 참여자 중{" "}
          <span className="font-bold">{percentValue}%</span>가 같은 유형입니다.
        </div>

        <div className="relative aspect-[300/160] w-[40%]">
          <SuspenseImage
            src={`/assets/moono/${type.toLowerCase()}-moono.png`}
            alt="무너"
            width={300}
            height={160}
            className="w-full object-contain"
          />
        </div>

        <div className="w-[90%] rounded-lg border border-pink-400 bg-white p-4">
          <div className="flex flex-col items-center">
            <div className="mb-2 flex flex-col items-center">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{ fontFamily: "kkubulim" }}
                  className="relative z-10 inline-block text-[17px]">
                  <span
                    className="absolute bottom-[0.3em] left-0 -z-10 h-[0.26em] w-full bg-pink-400"
                    aria-hidden="true"
                  />
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-col text-[11px] leading-relaxed">
              {splitSentences.map((line, idx) => (
                <p key={idx} className="mb-[3px]">
                  {renderHighlightedText(line)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[90%] rounded-lg border border-pink-400 bg-white p-4">
          <p className="relative mb-4 inline-block text-base font-bold">
            <span
              className="absolute bottom-[0.1em] left-0 -z-10 h-[0.4em] w-full bg-pink-400"
              aria-hidden="true"
            />
            영역별 트렌드 능력치
          </p>

          <div className="flex flex-col gap-3">
            <TrendBar label="SNS" value={user.characterProfile.sns_level} />
            <TrendBar
              label="Youtube"
              value={user.characterProfile.youtube_level}
            />
            <TrendBar label="Chat" value={user.characterProfile.sms_level} />
            <TrendBar
              label="Calling"
              value={user.characterProfile.call_level}
            />
            <TrendBar label="Books" value={user.characterProfile.book_level} />
            <TrendBar
              label="Saving"
              value={user.characterProfile.saving_level}
            />
          </div>
        </div>
        {/* 현재 요금제 관련 정보는 chat-storage(전역 저장소)에 저장되어 있음, 그것을 가져와 사용 중 */}
        {firstPlanMessage?.planData?.id !== undefined && (
          <PlanCard
            id={firstPlanMessage.planData.id}
            name={firstPlanMessage.planData.name ?? ""}
            data={firstPlanMessage.planData.data ?? ""}
            voice={firstPlanMessage.planData.voice ?? ""}
            sms={firstPlanMessage.planData.sms ?? ""}
            price={firstPlanMessage.planData.price ?? ""}
            tel={firstPlanMessage.planData.tel ?? ""}
          />
        )}
        <div className="mt-10 flex w-full flex-col items-center rounded-lg p-4 text-[14px]">
          <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
            더 정확한 요금제 추천을 원한다면?
          </p>

          <div className="relative mt-4 aspect-[400/200] w-[70%]">
            <SuspenseImage
              src="/assets/icons/moomool_banner.png"
              alt="무물배너"
              width={400}
              height={200}
              className="w-full object-contain"
            />
          </div>

          <p className="text-lg">무물에서</p>
          <p className="text-lg font-bold">진짜 나한테 맞는 요금제 찾기</p>
          <img
            src="/assets/icons/arrow.png"
            className="w-[80px]"
            alt="화살표"
          />

          <button
            onClick={handleOpenHomeInNewTab}
            className="mt-4 rounded-full bg-pink-400 px-9 py-4 font-bold text-black">
            무너에게 요금제 상담하기
          </button>
        </div>

        <div className="mt-10 flex w-full flex-col items-center rounded-lg p-4 text-[14px]">
          <ShareSection
            title="내 결과 공유하기"
            count={data?.sharedCount || 0}
            id={decryptedId}
            shareUrl={`/meme-test/result/${encryptedId}`}
          />
        </div>

        <div
          style={{ fontFamily: "kkubulim" }}
          className="mt-6 flex w-[90%] flex-col gap-3 text-2xl">
          <button
            onClick={handleNavigateToMemeTest}
            className="rounded-lg bg-pink-400 py-3 text-black shadow-md">
            테스트 다시하기
          </button>
          <button
            onClick={handleNavigateToRankPage}
            className="rounded-lg bg-yellow-300 py-3 text-black shadow-md">
            전체 유형 확인하기
          </button>
        </div>
      </main>
    </div>
  );
}
