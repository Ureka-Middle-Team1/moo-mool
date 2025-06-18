"use client";

import { Button } from "@/components/ui/button";

interface QuickReplyButtonProps {
  label: string;
  onClick: () => void;
}

export default function QuickReplyButton({
  label,
  onClick,
}: QuickReplyButtonProps) {
  return (
    <Button
      variant="outline"
      className="mb-3 h-auto rounded-full border border-none bg-yellow-50 px-3 py-1 text-xs font-light text-gray-800 shadow-sm"
      onClick={onClick}>
      {label}
    </Button>
  );
}
