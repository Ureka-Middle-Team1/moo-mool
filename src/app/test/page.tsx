"use client";

import ShareSection from "@/components/meme/shareSection";
import { useEffect, useState } from "react";

type Moono = {
  label: string;
  image: string;
  score: number;
};

export default function TestHomePage() {
  const [participantCount, setParticipantCount] = useState<number>(0);
  const [topMoonos, setTopMoonos] = useState<Moono[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/test/get-type-rank");
      console.log("응답 상태:", res.status);
      const data = await res.json();

      setParticipantCount(data.participantCount);

      const top = data.moonos
        .sort((a: Moono, b: Moono) => b.score - a.score)
        .slice(0, 2);

      setTopMoonos(top);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* 왼쪽 상단 로고 */}
      <img
        src="/assets/icons/logo.png"
        alt="logo"
        className="absolute top-4 left-4 h-auto w-24"
      />

      {/* 중앙 콘텐츠 */}
      <div className="flex h-full flex-col items-center justify-center gap-3 px-0">
        {/* 메인 이미지 */}
        <img
          src="/assets/icons/meme-test-home.png"
          alt="home"
          className="m-0 flex w-[80%]"
        />

        {/* 시작하기 버튼 */}
        <button className="mb-4 w-4/5 max-w-[250px] cursor-pointer rounded-lg bg-pink-500 px-6 py-2 text-lg text-white shadow-md transition hover:bg-yellow-500">
          시작하기
        </button>

        {/* 참여자 수 */}
        <div className="text-center">
          <p className="text-lg font-medium text-black">참여자 수</p>
          <p className="text-lg font-medium text-black">{participantCount}</p>
        </div>

        {/* 구분선 */}
        <hr className="my-3 w-[90%] border border-pink-500" />

        {/* 공유 + 아이콘 버튼 2개 */}
        <ShareSection title="테스트 공유하기" count={150} />

        {/* 1등 / 2등 카드 */}
        <div className="flex w-[90%] flex-col gap-4 rounded-[10px] bg-white p-4 shadow-md">
          {topMoonos.map((moono, index) => (
            <div key={index} className="flex w-full">
              <div className="flex w-1/2 items-center justify-between">
                <div className="mr-2 h-6 w-1 bg-pink-400"></div>
                <span className="text-sm font-bold text-black">
                  {index + 1}등
                </span>
                <img
                  src={`/assets/moono/${moono.image}.png`}
                  alt={moono.label}
                  className="ml-3 h-12 w-12"
                />
              </div>
              <div className="flex w-1/2 items-center justify-end pr-3">
                <p className="text-sm font-medium text-black">{moono.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
