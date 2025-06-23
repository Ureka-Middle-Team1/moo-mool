"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SortTarget } from "@/types/sort";
import {
  NETWORK_LABELS,
  OTT_LABELS,
  SORTTARGET_TO_LABEL,
} from "@/constants/labels";

export type OTTType =
  | "NETFLIX"
  | "YOUTUBE_PREMIUM"
  | "DISNEY+"
  | "WAVVE"
  | "TVING";

interface SortFilterPanelProps {
  selectedNetwork: "LTE" | "5G" | null;
  setSelectedNetwork: Dispatch<SetStateAction<"LTE" | "5G" | null>>;
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  sortTarget: SortTarget | null;
  setSortTarget: Dispatch<SetStateAction<SortTarget | null>>;
  selectedOttList: OTTType[];
  setSelectedOttList: Dispatch<SetStateAction<OTTType[]>>;
}

export default function SortFilterPanel({
  selectedNetwork,
  setSelectedNetwork,
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
  selectedOttList,
  setSelectedOttList,
}: SortFilterPanelProps) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // 하드코딩 제거된 옵션들
  const networkOptions = Object.entries(NETWORK_LABELS).map(([key, label]) => ({
    key,
    label,
  }));

  const ottOptions = Object.entries(OTT_LABELS).map(([key, label]) => ({
    key,
    label,
  }));

  const targetOptions = Object.entries(SORTTARGET_TO_LABEL).map(
    ([key, label]) => ({
      key: key as SortTarget,
      label,
    })
  );

  const sortOptions = [
    { key: "asc", label: "낮은 순" },
    { key: "desc", label: "높은 순" },
  ];

  const baseClass =
    "rounded-md border px-3 py-2 backdrop-blur-sm bg-white/30 text-sm text-black w-full appearance-none text-left";

  return (
    <div className="flex w-full max-w-full justify-start py-4">
      <div className="inline-flex gap-4">
        <div className="relative w-[3rem]">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className={baseClass}>
            {sortOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-500" />
        </div>

        <div className="relative w-[7rem]">
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

        <div className="relative w-[6rem]">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={baseClass}>
            필터링
          </button>
          <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-500" />

          {showFilterMenu && (
            <div className="absolute right-0 z-10 mt-2 w-[18rem] space-y-4 rounded-md border bg-white p-4 shadow-lg">
              <div>
                <div className="mb-2 text-sm font-bold">네트워크</div>
                <div className="flex gap-2">
                  {networkOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      className={`rounded-md border px-2 py-1 text-sm ${
                        selectedNetwork === key ? "bg-yellow-300" : "bg-white"
                      }`}
                      onClick={() => setSelectedNetwork(key as "LTE" | "5G")}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-bold">OTT 혜택</div>
                <div className="flex flex-wrap gap-2">
                  {ottOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      className={`rounded-md border px-2 py-1 text-sm ${
                        selectedOttList.includes(key as OTTType)
                          ? "bg-yellow-300"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        const isSelected = selectedOttList.includes(
                          key as OTTType
                        );
                        setSelectedOttList(
                          isSelected
                            ? selectedOttList.filter((v) => v !== key)
                            : [...selectedOttList, key as OTTType]
                        );
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
