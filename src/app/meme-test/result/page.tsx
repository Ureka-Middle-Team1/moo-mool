"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";
import { descriptionText, hashtagText } from "@/data/mockPlans";

import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";
import { useGetRecommendedPlanQuery } from "@/hooks/useGetRecommendedPlanQuery";
import { useUser } from "@/hooks/useUser";
import { memeTypeData } from "@/data/memeTypeData";

export default function TestPage() {
  const { data: plans, isLoading, isError } = useGetRecommendedPlanQuery();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser("cmbr9fdrc0000qussh91xmo29");

  if (isUserLoading) {
    return <p className="text-center">유저 정보를 불러오는 중입니다...</p>;
  }

  if (isUserError || !user) {
    return (
      <p className="text-center text-red-500">
        유저 정보를 불러올 수 없습니다.
      </p>
    );
  }

  if (!user.characterProfile) {
    return (
      <p className="text-center">
        아직 테스트 결과가 없습니다. 테스트를 먼저 진행해주세요.
      </p>
    );
  }
  const type = user?.characterProfile?.type || "Saving";
  const profile = user?.characterProfile;
  const { descriptionText, hashtagText, image } = memeTypeData[type];
  const splitSentences = parseSentences(descriptionText);
  const hashtags = parseHashtags(hashtagText);

  return (
    <div className="relative w-full max-w-[393px] bg-pink-200">
      <header className="sticky top-0 z-10 flex h-12 w-full items-center justify-between bg-yellow-200 px-4 font-bold">
        <div className="flex items-center">
          <ChevronLeft className="h-5 w-5" />
        </div>
        <div className="flex-1 text-center">콘텐츠 과몰입 테스트</div>
        <div className="h-5 w-5" /> {/* 아이콘 자리를 맞추기 위한 빈 div */}
      </header>

      <main className="flex flex-col items-center gap-5 px-4 pt-6 pb-10 text-center">
        <div className="text-2xl font-bold">팝콘 무너</div>
        <div>
          전체 테스트 참여자 중 <span className="font-bold">35.6%</span>가 같은
          유형입니다.
        </div>

        <img
          src="/assets/moono/youtube-moono.png"
          className="w-[50%]"
          alt="무너"
        />

        <div className="w-[90%] rounded-lg border-2 border-pink-400 bg-white p-4">
          <div className="flex flex-col items-center">
            {/* 해시태그 영역 */}
            <div className="mb-2 flex flex-col items-center">
              {hashtags.map((tag, idx) => (
                <span key={idx} className="relative inline-block font-bold">
                  <span
                    className="absolute bottom-[0.1em] left-0 -z-10 h-[0.4em] w-full bg-pink-400"
                    aria-hidden="true"
                  />
                  {tag}
                </span>
              ))}
            </div>

            {/* 영역별 트렌드 타이틀 */}
            <p className="underline-pink-bg mb-4 text-base font-bold">
              영역별 트렌드 능력치
            </p>

            <div className="mt-3 flex flex-col text-[12px] leading-relaxed">
              {splitSentences.map((line, idx) => (
                <p key={idx} className="mb-2">
                  {renderHighlightedText(line)}.
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[90%] rounded-lg border-2 border-pink-400 bg-white p-4">
          <p className="relative mb-4 inline-block text-base font-bold">
            <span
              className="absolute bottom-[0.1em] left-0 -z-10 h-[0.4em] w-full bg-pink-400"
              aria-hidden="true"
            />
            영역별 트렌드 능력치
          </p>

          <div className="flex flex-col gap-3">
            <TrendBar label="SNS" value={profile!.sns_level} />
            <TrendBar label="Youtube" value={profile!.youtube_level} />
            <TrendBar label="Chat" value={profile!.sms_level} />
            <TrendBar label="Calling" value={profile!.call_level} />
            <TrendBar label="Books" value={profile!.book_level} />
            <TrendBar label="Saving" value={profile!.saving_level} />
          </div>
        </div>

        <ShareSection title="내 결과 공유하기" count={150} />

        <button className="w-[90%] cursor-pointer rounded-lg bg-yellow-300/80 px-6 py-2 text-lg font-bold text-black shadow-md transition hover:bg-yellow-500">
          시작하기
        </button>

        <div className="mt-5 text-2xl font-bold">추천 요금제</div>

        <div className="flex w-full flex-col gap-4">
          {isLoading && <p className="text-center">요금제를 불러오는 중...</p>}
          {isError && (
            <p className="text-center text-red-500">요금제 불러오기 실패</p>
          )}
          {plans?.map((plan) => (
            <PlanCard
              key={plan.rank}
              rank={plan.rank}
              title={plan.title}
              subtitle={plan.subtitle}
              detail={plan.detail}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
