// app/not-found.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f9f4f4] px-6 text-center">
      <Image
        src="/assets/moono/404-moono.png"
        alt="404 Moono"
        width={200}
        height={200}
        className="mb-6"
        priority
      />
      <h1 className="text-3xl font-bold text-[#4E342E]">
        앗! 무너가 길을 잃었어요
      </h1>
      <p className="mt-2 text-[#6D4C41]">
        요청하신 페이지를 찾을 수 없어요.
        <br />
        다시 홈으로 돌아가볼까요?
      </p>
      <Link href="/">
        <Button className="mt-6 rounded-2xl bg-[#FADB7F] px-6 py-2 font-semibold text-white shadow-md transition hover:bg-[#66BB6A]">
          홈으로 이동
        </Button>
      </Link>
    </div>
  );
}
