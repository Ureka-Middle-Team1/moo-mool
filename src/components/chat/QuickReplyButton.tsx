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
      className="mt-2 mb-2 rounded-full border-none bg-yellow-50 text-sm shadow-md"
      onClick={onClick}>
      {label}
    </Button>
  );
}
