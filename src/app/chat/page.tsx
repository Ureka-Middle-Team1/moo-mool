import { Suspense } from "react";
import ChatbotPage from "./ChatbotPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="mt-10 text-center">로딩 중...</div>}>
      <ChatbotPage />
    </Suspense>
  );
}
