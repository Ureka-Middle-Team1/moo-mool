"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // shadcn dialog 가져와서 사용
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import UserProfile from "./UserProfile";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// 마이페이지 모달
export default function MyPageModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl bg-white p-6 backdrop-blur-sm sm:max-w-md">
        {/* Dialog 컴포넌트 내에선 VisuallyHidden을 이용해서 Title을 숨겨야 한다 (RadixUI 원칙) */}
        <VisuallyHidden asChild>
          <DialogTitle>집에 가고 싶어요</DialogTitle>
        </VisuallyHidden>
        <UserProfile></UserProfile>
      </DialogContent>
    </Dialog>
  );
}
