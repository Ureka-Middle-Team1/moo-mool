import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function HamburgerMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false); // Sheet 닫기
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-screen w-[50%] max-w-xs px-6 py-4">
        <nav className="mt-9 space-y-4">
          <button
            onClick={() => handleNavigate("/")}
            className="text-md hover:text-primary block font-semibold">
            홈
          </button>
          <button
            onClick={() => handleNavigate("/chat")}
            className="text-md hover:text-primary block font-semibold">
            챗봇
          </button>
          <button
            onClick={() => handleNavigate("/plan")}
            className="text-md hover:text-primary block font-semibold">
            요금제 리스트
          </button>
          <button
            onClick={() => handleNavigate("/meme-test")}
            className="text-md hover:text-primary block font-semibold">
            밈 테스트
          </button>
          <button
            onClick={() => handleNavigate("/nearby")}
            className="text-md hover:text-primary block font-semibold">
            주변 친구 찾기
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
