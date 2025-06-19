"use client";

import { useEffect, useState, Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import UserProfile from "./UserProfile";
import UserStamp from "./UserStamp";
import { useGetAllPlans } from "@/hooks/useGetAllPlans";
import axios from "axios";
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { getScoreContext } from "@/utils/planScore";
import { PlanDetailData } from "@/types/planDetail";
import { useSession } from "next-auth/react";
import TypeLevel from "./TypeLevel";
import { useUserStore } from "@/store/userStore";
import UserTendencyRadar from "../home/UserTendencyRadar";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MyPageModal({ open, onOpenChange }: Props) {
  const {
    data: plans = [],
    isLoading: isPlansLoading,
    error,
  } = useGetAllPlans();

  const { data: session } = useSession();
  const { setInvitedCount: setInvitedCountZustand } = useUserStore();
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [planChartData, setPlanChartData] = useState<PlanDetailData | null>(
    null
  );

  useEffect(() => {
    if (!open || !session?.user?.id) return;

    async function fetchUserPlan() {
      try {
        const res = await axios.get("/api/user/my-plan");
        const userMyPlanId = res.data.my_plan;
        const userInvitedCount = res.data.invited_count;
        const userType = res.data.type;

        if (userMyPlanId) setSelectedPlanId(userMyPlanId.toString());
        else setSelectedPlanId("");

        setInvitedCountZustand(userInvitedCount ?? 0); // zustand 공유 상태
        setUserType(userType ?? null);
      } catch (err) {
        console.error("유저 요금제 정보 불러오기 실패", err);
      }
    }

    fetchUserPlan();
  }, [open, session]);

  // 선택된 요금제에 따라 차트 데이터 가공
  useEffect(() => {
    if (!open || !selectedPlanId || plans.length === 0) return;

    const selected = plans.find((p) => p.id === Number(selectedPlanId));
    if (!selected) {
      setPlanChartData(null);
      return;
    }

    const scoreContext = getScoreContext(plans);
    const planData = mapPlanToDetailData(selected, scoreContext);
    setPlanChartData(planData);
  }, [selectedPlanId, plans, open]);

  // 요금제 변경
  const handlePlanChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPlanId(selectedId);
    setLoading(true);
    try {
      await axios.post("/api/user/set-my-plan", {
        planId: Number(selectedId),
      });
    } catch (err) {
      console.error("요금제 저장 실패", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-label="마이페이지 모달">
      <DialogContent className="flex h-[80vh] w-[387px] max-w-md flex-col overflow-hidden rounded-xl bg-white p-6">
        <VisuallyHidden asChild>
          <DialogTitle>마이페이지</DialogTitle>
        </VisuallyHidden>
        <DialogDescription className="sr-only">
          나의 요금제 설정 및 정보를 확인할 수 있는 모달
        </DialogDescription>

        {/* 고정 영역 */}
        <div className="relative shrink-0">
          <UserProfile invitedCount={useUserStore.getState().invitedCount} />
        </div>

        {/* 스크롤 영역 */}
        <div className="scrollbar-hide relative z-0 -mt-2 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="pointer-events-none sticky top-0 z-10 -mt-3 h-6 bg-gradient-to-b from-white to-transparent" />
          <TypeLevel
            invitedCount={useUserStore.getState().invitedCount}
            typeName={userType}
          />
          <UserStamp />
          <div className="mt-10 flex w-full flex-col gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">콘텐츠 성향</h2>
            <Suspense fallback={<div>성향 분석 불러오는 중...</div>}>
              <UserTendencyRadar />
            </Suspense>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex w-full flex-col">
              <label htmlFor="plan" className="text-lg">
                나의 요금제
              </label>
              <select
                id="plan"
                value={selectedPlanId}
                onChange={handlePlanChange}
                className="mt-4 block rounded-md border border-gray-300 bg-yellow-100 p-2 text-sm shadow-sm"
                disabled={loading || isPlansLoading}>
                <option value="">현재 사용중인 요금제를 선택해주세요</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id.toString()}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {planChartData && (
            <div className="mt-4 w-full max-w-full overflow-x-hidden">
              <TendencyBarChart
                data={planChartData.bar}
                rawData={planChartData.raw}
                name={planChartData.name}
                colors={[
                  "rgba(241, 145, 187, 0.6)",
                  "rgba(241, 145, 187, 0.6)",
                ]}
                height={260}
              />
            </div>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-500">
              요금제를 불러오는 중 오류가 발생했어요.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
