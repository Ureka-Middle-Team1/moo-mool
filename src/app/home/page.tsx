"use client";
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useRef } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import HomeRecommendedPlan from "@/components/home/HomeRecommendedPlan";
import PopularPlansList from "@/components/home/PopularPlansList";
import TopGradient from "@/components/planDetail/TopGradient";
import MyPageModal from "@/components/myPage/MyPageModal";
import { useModalStore } from "@/store/useModalStore";
import ChatHistoryList from "@/components/home/ChatHistoryList";
import FeatureBannerSlider from "@/components/home/FeatureBannerSlider";
import { useRouter } from "next/navigation";
import JoinAlertToast from "@/components/nearby/JoinAlertToast";
import { toast } from "sonner";

let toastId: string | number | null = null; // 중복 방지용

export default function HomePage() {
  const { isModalOpen, setModalOpen, openModal } = useModalStore();
  const router = useRouter();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ HomePage WebSocket 연결됨");

      socket.send(
        JSON.stringify({
          type: "home_ready",
        })
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("메세지 전달", message);

      if (message.type === "nearby_user_joined") {
        if (toastId === null) {
          toastId = toast.custom((id) => <JoinAlertToast toastId={id} />, {
            duration: 3000,
            onAutoClose: () => {
              toastId = null;
            },
            onDismiss: () => {
              toastId = null;
            },
          });
        }
      }
    };
    socket.onerror = (e) => {
      console.error("WebSocket 에러:", e);
    };

    socket.onclose = () => {
      console.log("❌ HomePage WebSocket 연결 종료");
    };

    return () => {
      socket.close();
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <Suspense fallback={<div>성향 불러오는 중...</div>}>
          <HomeHeader onAvatarClick={openModal} />
        </Suspense>
        {/* 마이페이지 Modal */}
        <MyPageModal open={isModalOpen} onOpenChange={setModalOpen} />
        <div className="flex w-full flex-col gap-7 px-3 py-5">
          <FeatureBannerSlider />
          <div className="flex w-full flex-col">
            <h2 className="pl-1 text-lg font-semibold text-gray-900">
              💬 최근 대화내역
            </h2>
            <ChatHistoryList />
          </div>
          {/* Suspense로 감싸기 */}
          <Suspense fallback={<div>추천 요금제 불러오는 중...</div>}>
            <HomeRecommendedPlan />
          </Suspense>

          <div className="flex w-full flex-col">
            <h2 className="pl-1 text-lg font-semibold text-gray-900">
              🔥 요즘 뜨는 요금제
            </h2>
            <PopularPlansList />
          </div>
        </div>
      </section>
    </div>
  );
}
