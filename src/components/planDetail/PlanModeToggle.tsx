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
  if (disabled) return null;

  return (
    <div className="relative mb-4 flex rounded-lg p-1 bg-gray-400 shadow-sm">
      <div className="relative flex w-full">
        <div
          className="absolute h-full w-1/2 rounded-md bg-white transition-transform duration-300"
          style={{
            transform: mode === "basic" ? "translateX(0%)" : "translateX(100%)",
          }}
        />

        <div className="relative z-10 flex w-full gap-1">
          <Button
            variant="ghost"
            className={`flex-1 rounded-md px-2 py-1 text-sm transition-none ${
              mode === "basic" ? "font-semibold text-black" : "text-gray-600"
            } hover:bg-transparent hover:text-inherit`}
            onClick={() => onChange("basic")}
          >
            기본
          </Button>

          <Button
            variant="ghost"
            className={`flex-1 rounded-md px-2 py-1 text-sm transition-none ${
              mode === "compare" ? "font-semibold text-black" : "text-gray-600"
            } hover:bg-transparent hover:text-inherit`}
            onClick={() => onChange("compare")}
          >
            내 요금제와 비교
          </Button>
        </div>
      </div>
    </div>
  );
}
