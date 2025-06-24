"use client";

import TagBadge from "./TagBadge";
import PlanModeToggle from "./PlanModeToggle";
import { PlanDetailData } from "@/types/planDetail";

interface PlanInfoProps {
  data: PlanDetailData;
  mode: "basic" | "compare";
  onChangeMode: (mode: "basic" | "compare") => void;
  disabled: boolean;
}

export default function PlanInfo({
  data,
  mode,
  onChangeMode,
  disabled,
}: PlanInfoProps) {
  return (
    <div className="px-8">
      <div className="scrollbar-hide w-full overflow-x-auto whitespace-nowrap">
        <h1
          className="inline-block max-w-full truncate pt-5 text-[1.75rem] leading-snug font-bold [word-break:keep-all] text-gray-900"
          title={data.name}>
          {data.name}
        </h1>
      </div>
      <p className="text-[1rem] font-semibold text-gray-900">{data.price}</p>

      <div className="my-1 mb-5 flex flex-wrap gap-1">
        {data.tags.map((tag, index) => (
          <TagBadge key={index} text={tag} />
        ))}
      </div>

      <PlanModeToggle mode={mode} onChange={onChangeMode} disabled={disabled} />
    </div>
  );
}
