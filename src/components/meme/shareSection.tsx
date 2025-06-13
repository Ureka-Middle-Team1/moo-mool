"use client";

import { Share2, Link } from "lucide-react";
import React from "react";
import { useEncryptedUserId } from "@/hooks/useEncryptedUserId";

interface ShareSectionProps {
  title: string;
  count: number;
  id: string;
}

export default function ShareSection({ title, count, id }: ShareSectionProps) {
  const { data: encryptedId, isLoading } = useEncryptedUserId(id);

  const handleShare = () => {
    console.log("encryt-================================= :  ", encryptedId);
    if (!encryptedId) return alert("링크를 불러오는 중입니다.");
    const shareUrl = `${window.location.origin}/meme-test/result/${encryptedId}`;

    if (window.Kakao && window.Kakao.Link) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!);
      }
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "내 밈 테스트 결과 보기",
          description: "당신의 콘텐츠 소비 성향을 알아보세요!",
          imageUrl: "/assets/icons/moomool_banner.png",
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [
          {
            title: "결과 보러가기",
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
        ],
      });
    }
  };

  return (
    <>
      <div className="mb-4 flex w-[90%] items-center justify-center gap-2">
        <p className="text-lg text-black">{title}</p>
        <div className="flex items-center gap-1">
          <Share2 className="text-black" />
          <p className="text-lg font-medium text-black">{count}</p>
        </div>
      </div>
      <div className="mb-6 flex gap-4">
        {/* 메시지 공유 버튼 */}
        <div
          onClick={handleShare}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition ${isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-pink-400 hover:bg-yellow-500"}`}>
          <img
            src="/assets/icons/message-circle.png"
            className="h-6 w-6"
            alt="message"
          />
        </div>

        {/* 링크 복사 버튼 (선택사항) */}
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/meme-test/result/${encryptedId}`
            );
            alert("링크가 복사되었습니다!");
          }}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition ${isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-pink-400 hover:bg-yellow-500"}`}>
          <Link className="h-6 w-6 text-white" />
        </div>
      </div>
    </>
  );
}
