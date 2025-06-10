"use client";

import React, { JSX } from "react";
import { ChevronLeft } from "lucide-react";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";

interface PlanCardProps {
  rank: number;
  title: string;
  subtitle: string;
  detail: string;
}

export default function TestPage() {
  const descriptionText = `"한 편만 본다더니 시즌 정주행한 나 자신… 또 속았지 뭐야?" 영화, 드라마, 예능, 유튜브, 숏폼까지! 당신의 하루는 스크린 속에서 시작되고 끝나요. 시간만 나면 넷플릭스 켜고, 잠들기 전엔 유튜브 한 편은 필수. '이거 안 보면 대화 못 껴'라는 핑계로 모든 콘텐츠를 섭렵하는 당신은, 세상의 모든 스트리밍을 책임지는 정통 무너계의 "콘텐츠 요정!" 오늘도 플레이 버튼을 눌러주세요. 끝나지 않는 재미가 기다리고 있어요.`;
  const hashtagText = "정주행은_못참지 정주행은_못참지 정주행은_못참지";

  const splitSentences = descriptionText
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const hashtags = hashtagText
    .split(" ")
    .map((w) => `#${w.trim()}`)
    .filter((h) => h.length > 1);

  const renderHighlightedText = (sentence: string) => {
    const regex = /(["“”'])(.*?)(\1)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(sentence)) !== null) {
      const [fullMatch] = match;
      const matchStart = match.index;
      const matchEnd = regex.lastIndex;
      if (matchStart > lastIndex) {
        parts.push(sentence.slice(lastIndex, matchStart));
      }
      parts.push(
        <span className="font-bold" key={matchStart}>
          {fullMatch}
        </span>
      );
      lastIndex = matchEnd;
    }
    if (lastIndex < sentence.length) {
      parts.push(sentence.slice(lastIndex));
    }
    return parts;
  };

  const mockPlans = [
    {
      rank: 1,
      title: "5G 프리미엄 플러스",
      subtitle: "데이터 무제한",
      detail: "테더링 + 쉐어링 1000GB",
    },
    {
      rank: 2,
      title: "5G 프리미엄 플러스",
      subtitle: "데이터 무제한",
      detail: "테더링 + 쉐어링 2000GB",
    },
    {
      rank: 3,
      title: "5G 프리미엄 플러스",
      subtitle: "데이터 무제한",
      detail: "테더링 + 쉐어링 3000GB",
    },
  ];

  return (
    <div>
      <div className="relative w-full max-w-[393px] bg-pink-200">
        <header className="sticky top-0 z-10 flex h-12 w-full items-center bg-yellow-200 px-4 font-bold">
          <div className="absolute left-4">
            <ChevronLeft />
          </div>
          <div className="w-full text-center">콘텐츠 과몰입 테스트</div>
        </header>

        <main className="flex flex-col items-center gap-5 px-4 pt-6 pb-10 text-center">
          <div className="text-2xl font-bold">팝콘 무너</div>
          <div>
            전체 테스트 참여자 중 <span className="font-bold">35.6%</span>가
            같은 유형입니다.
          </div>
          <img
            src="/assets/moono/youtube-moono.png"
            className="w-[50%]"
            alt="무너"
          />

          <div className="w-[90%] rounded-lg border-2 border-pink-400 bg-white p-4">
            <div className="flex flex-col items-center">
              <div className="mb-2 flex flex-col items-center underline decoration-pink-400 decoration-4">
                {hashtags.map((tag, idx) => (
                  <p key={idx} className="font-bold">
                    {tag}
                  </p>
                ))}
              </div>
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
            <p className="mb-4 text-base font-bold underline decoration-pink-400 decoration-4">
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

          <div className="text-xl font-bold">추천 요금제</div>

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
    </div>
  );
}
