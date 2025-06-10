"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";
import {
  mockPlans,
  descriptionText,
  hashtagText,
  Plan,
} from "@/data/mockPlans";

import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";

export default function TestPage() {
  const splitSentences = parseSentences(descriptionText);
  const hashtags = parseHashtags(hashtagText);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plan/recommend");
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error("요금제 불러오기 실패:", error);
      }
    };
    fetchPlans();
  }, []);

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
            <TrendBar label="SNS" value={60} />
            <TrendBar label="Youtube" value={85} />
            <TrendBar label="Chat" value={45} />
            <TrendBar label="Calling" value={70} />
            <TrendBar label="Books" value={30} />
            <TrendBar label="Saving" value={15} />
          </div>
        </div>

        <ShareSection title="내 결과 공유하기" count={150} />

        <button className="w-[90%] cursor-pointer rounded-lg bg-yellow-300/80 px-6 py-2 text-lg font-bold text-black shadow-md transition hover:bg-yellow-500">
          시작하기
        </button>

        <div className="mt-5 text-2xl font-bold">추천 요금제</div>

        <div className="flex w-full flex-col gap-4">
          {mockPlans.map((plan) => (
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
