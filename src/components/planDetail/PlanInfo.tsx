"use client";

import TagBadge from "@/components/common/TagBadge";
import PlanModeToggle from "./PlanModeToggle";
import { TendencyPlanData } from "@/types/planDetail";

interface PlanInfoProps {
  data: TendencyPlanData;
  mode: "basic" | "compare";
  onChangeMode: (mode: "basic" | "compare") => void;
}

export default function PlanInfo({ data, mode, onChangeMode }: PlanInfoProps) {
  return (
    <div className="px-8">
      <h1 className="mt-[20px] text-[28px] leading-tight font-bold text-gray-900">
        {data.name}
      </h1>
      <p className="text-[17px] font-semibold text-gray-900">{data.price}</p>

      <div className="my-1 mb-[20px] flex flex-wrap gap-1">
        {data.tags.map((tag, index) => (
          <TagBadge key={index} text={tag} index={index} />
        ))}
      </div>

      <PlanModeToggle mode={mode} onChange={onChangeMode} />
    </div>
  );
}
