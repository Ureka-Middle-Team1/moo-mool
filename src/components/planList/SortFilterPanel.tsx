"use client";

import { Dispatch, SetStateAction } from "react";
import { SortTarget } from "@/types/sort";

interface SortFilterPanelProps {
  selectedNetwork: "LTE" | "5G" | null;
  setSelectedNetwork: Dispatch<SetStateAction<"LTE" | "5G" | null>>;
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  sortTarget: SortTarget | null;
  setSortTarget: Dispatch<SetStateAction<SortTarget | null>>;
}

export default function SortFilterPanel({
  selectedNetwork,
  setSelectedNetwork,
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
}: SortFilterPanelProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">정렬 기준</div>
      <div className="flex gap-2">
        <button
          className={`rounded-md border px-2 py-1 ${sortOrder === "asc" ? "bg-yellow-200" : "bg-gray-100"}`}
          onClick={() => setSortOrder("asc")}>
          낮은 순
        </button>
        <button
          className={`rounded-md border px-2 py-1 ${sortOrder === "desc" ? "bg-yellow-200" : "bg-gray-100"}`}
          onClick={() => setSortOrder("desc")}>
          높은 순
        </button>
      </div>

      <div className="mt-4 text-sm font-semibold">네트워크 타입</div>
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedNetwork("LTE")}
          className={`rounded-md border px-2 py-1 ${selectedNetwork === "LTE" ? "bg-yellow-200" : "bg-gray-100"}`}>
          LTE
        </button>
        <button
          onClick={() => setSelectedNetwork("5G")}
          className={`rounded-md border px-2 py-1 ${selectedNetwork === "5G" ? "bg-yellow-200" : "bg-gray-100"}`}>
          5G
        </button>
      </div>

      <div className="mt-4 text-sm font-semibold">정렬 항목</div>
      <div className="flex flex-wrap gap-2">
        {[
          { key: "price", label: "가격" },
          { key: "dataAmountMb", label: "월 데이터량" },
          { key: "voiceMinutes", label: "부가 통화" },
          { key: "overageSpeedMbps", label: "속도" },
          { key: "smsIncluded", label: "혜택 가치" },
          { key: "subscriptionServices", label: "혜택 수" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortTarget(key as SortTarget)}
            className={`rounded-md border px-2 py-1 ${sortTarget === key ? "bg-yellow-300" : "bg-gray-100"}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
