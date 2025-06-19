"use client";

import { Dispatch, SetStateAction } from "react";
import { SortTarget } from "@/types/sort";
import SortFilterPanel from "./SortFilterPanel";
import { UINetworkType } from "@/types/network";

interface StickySortFilterProps {
  selectedNetwork: UINetworkType | null;
  setSelectedNetwork: Dispatch<SetStateAction<UINetworkType | null>>;
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  sortTarget: SortTarget | null;
  setSortTarget: Dispatch<SetStateAction<SortTarget | null>>;
}

export default function StickySortFilter({
  selectedNetwork,
  setSelectedNetwork,
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
}: StickySortFilterProps) {
  return (
    <div className="sticky top-[3.5rem] z-40 p-4">
      <div className="absolute inset-0 -z-10 rounded-xl" />
      <SortFilterPanel
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortTarget={sortTarget}
        setSortTarget={setSortTarget}
      />
    </div>
  );
}
