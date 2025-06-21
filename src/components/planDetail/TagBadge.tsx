"use client";

import { Badge } from "@/components/ui/badge";
import { BADGE_COLOR_MAP } from "@/constants/badgeColors";

interface TagBadgeProps {
  text: string;
}

export default function TagBadge({ text }: TagBadgeProps) {
  const colorClass = BADGE_COLOR_MAP[text] || "bg-gray-200 text-gray-700";

  return (
    <Badge className={`rounded-md px-2 py-1 text-[0.6rem] font-medium ${colorClass}`}>
      {text}
    </Badge>
  );
}