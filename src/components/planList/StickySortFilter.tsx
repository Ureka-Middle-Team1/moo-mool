"use client";

import { Dispatch, SetStateAction } from "react";
import { SortTarget } from "@/types/sort";
import SortFilterPanel, { OTTType } from "./SortFilterPanel";
import { UINetworkType } from "@/types/network";

interface StickySortFilterProps {
  selectedNetwork: UINetworkType | null;
  setSelectedNetwork: Dispatch<SetStateAction<UINetworkType | null>>;
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  sortTarget: SortTarget | null;
  setSortTarget: Dispatch<SetStateAction<SortTarget | null>>;
  selectedOttList: OTTType[];
  setSelectedOttList: Dispatch<SetStateAction<OTTType[]>>;
}

export default function StickySortFilter({
  selectedNetwork,
  setSelectedNetwork,
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
  selectedOttList,
  setSelectedOttList,
}: StickySortFilterProps) {
  return (
    <div className="sticky top-[0rem] z-10 w-full max-w-[18rem]">
      <SortFilterPanel
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortTarget={sortTarget}
        setSortTarget={setSortTarget}
        selectedOttList={selectedOttList}
        setSelectedOttList={setSelectedOttList}
      />
    </div>
  );
}
