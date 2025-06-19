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
  const baseClass =
    "rounded-md border px-2 py-1 backdrop-blur-sm bg-white/30 text-sm text-black";

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">정렬 기준</div>
      <div className="flex gap-2">
        <button
          className={`${baseClass} ${
            sortOrder === "asc" ? "ring-2 ring-yellow-300" : ""
          }`}
          onClick={() => setSortOrder("asc")}>
          낮은 순
        </button>
        <button
          className={`${baseClass} ${
            sortOrder === "desc" ? "ring-2 ring-yellow-300" : ""
          }`}
          onClick={() => setSortOrder("desc")}>
          높은 순
        </button>
      </div>

      <div className="mt-4 text-sm font-semibold">네트워크 타입</div>
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedNetwork("LTE")}
          className={`${baseClass} ${
            selectedNetwork === "LTE" ? "ring-2 ring-yellow-300" : ""
          }`}>
          LTE
        </button>
        <button
          onClick={() => setSelectedNetwork("5G")}
          className={`${baseClass} ${
            selectedNetwork === "5G" ? "ring-2 ring-yellow-300" : ""
          }`}>
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
            className={`${baseClass} ${
              sortTarget === key ? "ring-2 ring-yellow-400" : ""
            }`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
