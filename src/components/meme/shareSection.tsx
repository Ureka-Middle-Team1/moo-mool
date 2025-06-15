"use client";

import { Share2, Link } from "lucide-react";
import React from "react";
import { useEncryptedUserId } from "@/hooks/useEncryptedUserId";

interface ShareSectionProps {
  title: string;
  count: number;
  id: string;
  shareUrl: string;
  isEncrypted?: boolean;
}

export default function ShareSection({
  title,
  count,
  id,
  shareUrl,
  isEncrypted = false,
}: ShareSectionProps) {
  const { data: encryptedIdFromHook, isLoading } = useEncryptedUserId(id);
  const encryptedId = isEncrypted ? id : encryptedIdFromHook;

  const getFullUrl = () => {
    const domain =
      process.env.NEXT_PUBLIC_SHARE_DOMAIN || window.location.origin;

    return `${domain}${
      shareUrl.includes("[encryptedId]") && encryptedId
        ? shareUrl.replace("[encryptedId]", encryptedId)
        : shareUrl
    }`;
  };

  const handleShare = async () => {
    const fullUrl = getFullUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "내 밈 테스트 결과 보기",
          text: "당신의 콘텐츠 소비 성향을 알아보세요!",
          url: fullUrl,
        });
      } catch (error) {
        alert("공유를 취소하거나 실패했습니다.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert("공유를 지원하지 않는 브라우저입니다. 링크를 복사했어요!");
      } catch {
        alert("공유와 복사 모두 실패했습니다.");
      }
    }
  };

  const handleCopy = () => {
    if (!encryptedId) {
      alert("링크를 불러오는 중입니다.");
      return;
    }

    const fullUrl = getFullUrl();
    navigator.clipboard.writeText(fullUrl);
    alert("링크가 복사되었습니다!");
  };

  return (
    <>
      <div className="mb-2 flex w-[90%] items-center justify-center gap-2">
        <p className="text-[15px] text-black">{title}</p>
        <div className="flex items-center gap-1">
          <Share2 className="h-[15px] w-[15px] text-black" />
          <p className="text-[15px] font-medium text-black">{count}</p>
        </div>
      </div>
      <div className="mb-6 flex gap-4">
        {/* 메시지 공유 버튼 */}
        <div
          onClick={handleShare}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition ${isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-pink-400 hover:bg-yellow-500"}`}>
          <img
            src="/assets/icons/message-circle.png"
            className="h-5 w-5"
            alt="message"
          />
        </div>

        {/* 링크 복사 버튼 */}
        <div
          onClick={handleCopy}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition ${isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-pink-400 hover:bg-yellow-500"}`}>
          <Link className="h-6 w-6 text-white" />
        </div>
      </div>
    </>
  );
}
