"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-screen w-full max-w-xs px-6 py-4 sm:max-w-xs">
        <nav className="mt-6 space-y-4">
          <Link
            href="/"
            className="hover:text-primary block text-lg font-semibold">
            홈
          </Link>
          <Link
            href="/chat"
            className="hover:text-primary block text-lg font-semibold">
            챗봇
          </Link>
          <Link
            href="/mypage"
            className="hover:text-primary block text-lg font-semibold">
            마이페이지
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
