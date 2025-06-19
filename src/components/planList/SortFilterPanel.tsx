"use client";

import { Dispatch, SetStateAction } from "react";
import { SortTarget } from "@/types/sort";
import { ChevronDown } from "lucide-react";

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
  const filterOptions = [
    { key: "LTE", label: "LTE" },
    { key: "5G", label: "5G" },
  ];

  const sortOptions = [
    { key: "asc", label: "낮은 순" },
    { key: "desc", label: "높은 순" },
  ];

  const targetOptions: { key: SortTarget; label: string }[] = [
    { key: "price", label: "가격" },
    { key: "dataAmountMb", label: "월 데이터량" },
    { key: "voiceMinutes", label: "부가 통화" },
    { key: "overageSpeedMbps", label: "속도" },
    { key: "subscriptionServices", label: "혜택 수" },
  ];

  const baseClass =
    "rounded-md border px-3 py-2 backdrop-blur-sm bg-white/30 text-sm text-black w-full appearance-none";

  return (
    <div className="flex w-full justify-end px-4 py-4">
      {/* 내부 정렬용 컨테이너 */}
      <div className="inline-flex gap-4">
        <div className="relative w-[6rem]">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className={baseClass}>
            <option value="desc">높은 순</option>
            <option value="asc">낮은 순</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-500" />
        </div>

        {/* Network Filter Dropdown */}
        <div className="relative w-[6rem]">
          <select
            value={selectedNetwork ?? ""}
            onChange={(e) =>
              setSelectedNetwork(
                e.target.value === "" ? null : (e.target.value as "LTE" | "5G")
              )
            }
            className={baseClass}>
            <option value="" disabled hidden>
              네트워크
            </option>
            {filterOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-500" />
        </div>

        {/* Sort Order Dropdown */}
        <div className="relative w-[6rem]">
          <select
            value={sortTarget ?? ""}
            onChange={(e) =>
              setSortTarget(
                e.target.value === "" ? null : (e.target.value as SortTarget)
              )
            }
            className={baseClass}>
            <option value="" disabled hidden>
              정렬 기준
            </option>
            {targetOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
