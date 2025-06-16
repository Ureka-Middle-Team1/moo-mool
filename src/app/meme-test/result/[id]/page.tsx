"use client";

import React from "react";
import { ChevronLeft, X } from "lucide-react";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
export const dynamic = "force-dynamic";

import { decrypt } from "@/utils/crypto";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { getMemeTypeLabel, MemeType, memeTypeData } from "@/store/memeTypeData";
import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/meme/Header";

export default function ResultPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();

  const params = useParams();
  const encryptedId = params.id as string;

  const decryptedId = encryptedId
    ? decrypt(decodeURIComponent(encryptedId))
    : null;

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserInfo(decryptedId || "");

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
        <div className="text-2xl font-bold">
          {getMemeTypeLabel(type as MemeType)}
        </div>
        <div>
          전체 테스트 참여자 중{" "}
          <span className="font-bold">{percentValue || 0}%</span>가 같은
          유형입니다.
        </div>

        <img
          src={`/assets/moono/${type.toLowerCase()}-moono.png`}
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
            <div className="mt-3 flex flex-col text-[11px] leading-relaxed">
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

        <div className="mt-3 flex w-[100%] flex-col items-center gap-2 rounded-lg">
          <div className="mt-5 flex gap-2 text-2xl">
            <img src="\assets\icons\U_plus.png" className="h-[30px]" />
            <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
              추천 요금제
            </p>
          </div>
          <div className="flex w-[90%] flex-col gap-4">
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
          <button
            onClick={handleOpenHomeInNewTab}
            className="rounded-full bg-pink-400 px-9 py-4 font-bold text-black">
            무너에게 요금제 상담하기
          </button>
        </div>

        <div className="mt-10 flex w-[100%] flex-col items-center rounded-lg p-4 text-[14px]">
          <div className="mb-2 flex flex-col items-center">
            <p
              style={{ fontFamily: "kkubulim" }}
              className="relative z-10 mb-2 inline-block text-xl">
              <span className="relative z-10 inline-block text-xl">
                <span
                  className="absolute bottom-[0.3em] left-0 -z-10 h-[0.26em] w-full bg-pink-400"
                  aria-hidden="true"
                />
                테스트 결과 공유
              </span>
              하고, <br />
              히든 프로필 획득하자!
            </p>
          </div>
          <img
            src="\assets\icons\stamp_area.png"
            alt="도장 미션"
            className="mx-auto w-[100%]"
          />
          <div className="mt-4 flex w-[90%] flex-col items-center justify-between">
            <ShareSection
              title="내 결과 공유하기"
              count={data?.sharedCount || 0}
              id={decryptedId}
              shareUrl={`/meme-test/result/${encryptedId}`}
            />
            <div className="rounded-md p-3 text-[11px] leading-tight text-gray-800">
              <ul className="list-disc space-y-1 text-left">
                <li>본 이벤트는 "무물"에 로그인한 회원에 한해 적용됩니다.</li>
                <li>
                  테스트를 공유받은 사용자가 해당 링크를 통해 테스트를 완료한
                  경우, 공유한 회원에게 도장이 1회 지급됩니다.
                </li>
                <li>
                  도장은 로그인된 계정에 자동으로 누적되며, 일정 개수 이상 모일
                  경우 프로필이 단계별로 업그레이드됩니다.
                </li>
              </ul>
            </div>
          </div>
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
