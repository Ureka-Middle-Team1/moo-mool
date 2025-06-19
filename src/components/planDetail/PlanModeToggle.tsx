"use client";

import { Button } from "@/components/ui/button";

interface PlanModeToggleProps {
  mode: "basic" | "compare";
  onChange: (mode: "basic" | "compare") => void;
  disabled?: boolean;
}

export default function PlanModeToggle({
  mode,
  onChange,
  disabled = false,
}: PlanModeToggleProps) {
  return (
    <div
      className={`relative mb-4 flex overflow-hidden rounded-lg p-0.5 ${
        disabled ? "bg-gray-300" : "bg-gray-400 shadow-sm"
      }`}>
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 rounded-lg bg-white transition-transform duration-500"
        style={{
          transform: mode === "basic" ? "translateX(0%)" : "translateX(100%)",
        }}
      />

      <Button
        variant="ghost"
        disabled={disabled}
        className={`z-10 flex-1 py-0.5 text-sm ${
          disabled
            ? "cursor-not-allowed text-gray-500"
            : mode === "basic"
              ? "font-semibold text-gray-700"
              : "text-black"
        }`}
        onClick={() => onChange("basic")}>
        기본
      </Button>

      <Button
        variant="ghost"
        disabled={disabled}
        className={`z-10 flex-1 py-0.5 text-sm ${
          disabled
            ? "cursor-not-allowed text-gray-500"
            : mode === "compare"
              ? "font-semibold text-gray-700"
              : "text-black"
        }`}
        onClick={() => onChange("compare")}>
        내 요금제와 비교
      </Button>
    </div>
  );
}
