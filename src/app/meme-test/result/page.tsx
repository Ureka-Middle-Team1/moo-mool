"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";
import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";
import { memeTypeData } from "@/data/memeTypeData";

export default function TestPage() {
  // 더미 데이터 설정
  const dummyUser = {
    characterProfile: {
      type: "Books",
      sns_level: 70,
      youtube_level: 90,
      sms_level: 40,
      call_level: 30,
      book_level: 20,
      saving_level: 50,
    },
  };

  const dummyPlans = [
    {
      rank: 1,
      title: "요금제 A",
      subtitle: "합리적인 선택",
      detail: "월 33,000원 / 데이터 10GB",
    },
  ];

  const user = dummyUser;
  const plans = dummyPlans;

  if (!user.characterProfile) {
    return (
      <p className="text-center">
        아직 테스트 결과가 없습니다. 테스트를 먼저 진행해주세요.
      </p>
    );
  }

  const type = user.characterProfile.type || "Saving";
  const profile = user.characterProfile;
  const { descriptionText, hashtagText, image } = memeTypeData[type];
  const splitSentences = parseSentences(descriptionText);
  const hashtags = parseHashtags(hashtagText);

  return (
    <div className="relative w-full max-w-[393px] bg-pink-200">
      <header className="sticky top-0 z-100 flex h-12 w-full items-center justify-between bg-yellow-200 px-4 font-bold">
        <div className="flex items-center">
          <ChevronLeft className="h-5 w-5" />
        </div>
        <div className="flex-1 text-center">콘텐츠 과몰입 테스트</div>
        <div className="h-5 w-5" />
      </header>

      <main className="flex flex-col items-center gap-5 px-4 pt-6 pb-10 text-center">
        <div className="text-2xl font-bold">팝콘 무너</div>
        <div>
          전체 테스트 참여자 중 <span className="font-bold">35.6%</span>가 같은
          유형입니다.
        </div>

        <img
          src="/assets/moono/youtube-moono.png"
          className="w-[40%]"
          alt="무너"
        />

        <div className="w-[90%] rounded-lg border-1 border-pink-400 bg-white p-4">
          <div className="flex flex-col items-center">
            {/* 해시태그 영역 */}
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
            <div className="mt-3 flex flex-col text-[9px] leading-relaxed">
              {splitSentences.map((line, idx) => (
                <p key={idx} className="mb-[3px]">
                  {renderHighlightedText(line)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[90%] rounded-lg border-1 border-pink-400 bg-white p-4">
          <p className="relative mb-4 inline-block text-base font-bold">
            <span
              className="absolute bottom-[0.1em] left-0 -z-10 h-[0.4em] w-full bg-pink-400"
              aria-hidden="true"
            />
            영역별 트렌드 능력치
          </p>

          <div className="flex flex-col gap-3">
            <TrendBar label="SNS" value={profile.sns_level} />
            <TrendBar label="Youtube" value={profile.youtube_level} />
            <TrendBar label="Chat" value={profile.sms_level} />
            <TrendBar label="Calling" value={profile.call_level} />
            <TrendBar label="Books" value={profile.book_level} />
            <TrendBar label="Saving" value={profile.saving_level} />
          </div>
        </div>

        <div className="mt-3 flex w-[100%] flex-col items-center gap-2 rounded-lg">
          <div className="mt-5 flex gap-2 text-2xl">
            <img src="\assets\icons\U_plus.png" className="h-[30px]"></img>
            <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
              추천 요금제
            </p>
          </div>
          <div className="flex w-[90%] flex-col gap-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.rank}
                rank={plan.rank}
                title={plan.title}
                subtitle={plan.subtitle}
                detail={plan.detail}
              />
            ))}
            <p className="text-[11px] text-black">
              본 테스트는 LG유플러스와의 협업을 통해 제작되었으며, <br />
              테스트 결과에 기반한 추천 요금제는 모두 LG유플러스의 요금제입니다.
            </p>
          </div>
        </div>

        <div className="mt-10 flex w-[100%] flex-col items-center gap-2 rounded-lg">
          <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
            더 정확한 요금제 추천을 원한다면?
          </p>
          <img
            src="\assets\icons\moomool_banner.png"
            className="w-[70%]"
            alt="무물배너"
          />
          <p className="text-lg">무물에서</p>
          <p className="text-lg font-bold">진짜 나한테 맞는 요금제 찾기</p>
          <img
            src="\assets\icons\arrow.png"
            className="w-[80px]"
            alt="화살표"
          />
          <button className="rounded-full bg-pink-400 px-4 py-2 font-bold text-black">
            무너에게 요금제 상담하기
          </button>
        </div>

        <div className="rounded-lgp-4 mt-10 flex w-[100%] flex-col items-center text-[14px]">
          <p style={{ fontFamily: "kkubulim" }} className="mb-2 text-xl">
            테스트 결과 공유하고, <br />
            히든 프로필 획득하자!
          </p>
          <img
            src="\assets\icons\stamp_area.png"
            alt="도장 미션"
            className="mx-auto w-[100%]"
          />
          <div className="mt-4 flex w-[90%] flex-col items-center justify-between">
            <ShareSection title="내 결과 공유하기" count={150} />
            <div className="rounded-md p-3 text-[11px] leading-tight text-gray-800">
              <ul className="list-disc space-y-1 text-left">
                <li>본 이벤트는 "무물"에 로그인한 회원에 한해 적용됩니다.</li>
                <li>
                  도장을 테스트를 공유받은 사용자가 해당 링크를 통해 테스트를
                  완료한 경우에만 공유한 회원에게 1회 지급됩니다.
                </li>
                <li>
                  도장은 로그인된 계정에 자동으로 누적되며, 일정 개수 이상 모일
                  경우 프로필이 단계별로 업그레이드됩니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-[90%] flex-col gap-3">
          <button className="rounded-lg bg-pink-300 py-3 font-bold text-black shadow-md">
            온라인 단독 요금제 너겟
          </button>
          <button className="rounded-lg bg-yellow-300 py-3 font-bold text-black shadow-md">
            전체 유형 확인하기
          </button>
        </div>
      </main>
    </div>
  );
}
