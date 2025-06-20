"use client";

import { useEffect, useState, Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSession } from "next-auth/react";

import { useGetAllPlans } from "@/hooks/useGetAllPlans";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { getScoreContext } from "@/utils/planScore";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { PlanDetailData } from "@/types/planDetail";
import { useUserStore } from "@/store/userStore";

import UserSection from "./UserSection";
import PlanSelect from "./PlanSelect";
import PlanChart from "./PlanChart";
import UserTendencyRadar from "./UserTendencyRadar";
import TypeLevel from "./TypeLevel";
import UserStamp from "./UserStamp";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MyPageModal({ open, onOpenChange }: Props) {
  const {
    data: plans = [],
    isLoading: isPlansLoading,
    error: plansError,
  } = useGetAllPlans();
  const { data: session } = useSession();
  const {
    data: myPlanData,
    isLoading: isMyPlanLoading,
    error: myPlanError,
    refetch,
  } = useGetMyPlan();

  const invitedCount = useUserStore((state) => state.invitedCount);
  const setInvitedCount = useUserStore((state) => state.setInvitedCount);

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [userType, setUserType] = useState<string | null>(null);
  const [planChartData, setPlanChartData] = useState<PlanDetailData | null>(
    null
  );

  // 모달 열릴 때마다 최신 데이터 불러오기
  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  // myPlanData 기반 상태 세팅
  useEffect(() => {
    if (!open || !session?.user?.id || !myPlanData) return;

    setSelectedPlanId((myPlanData.my_plan ?? "").toString());
    setInvitedCount(myPlanData.invited_count ?? 0);
    setUserType(myPlanData.type ?? null);
  }, [open, session?.user?.id, myPlanData, setInvitedCount]);

  // 요금제 변경 시 차트 업데이트
  useEffect(() => {
    if (!open || !selectedPlanId || plans.length === 0) {
      setPlanChartData(null);
      return;
    }

    const selected = plans.find((p) => p.id === Number(selectedPlanId));
    if (!selected) {
      setPlanChartData(null);
      return;
    }

    const scoreContext = getScoreContext(plans);
    const planData = mapPlanToDetailData(selected, scoreContext);
    setPlanChartData(planData);
  }, [selectedPlanId, plans, open]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-label="마이페이지 모달">
      <DialogContent className="flex h-[80vh] w-[387px] max-w-md flex-col overflow-hidden rounded-xl bg-white p-6">
        {(isPlansLoading || isMyPlanLoading) && (
          <p className="m-auto text-center text-gray-500">
            데이터를 불러오는 중입니다...
          </p>
        )}

        {(plansError || myPlanError) && !isPlansLoading && !isMyPlanLoading && (
          <p className="m-auto text-center text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}

        {!isPlansLoading && !isMyPlanLoading && !plansError && !myPlanError && (
          <>
            <VisuallyHidden asChild>
              <DialogTitle>마이페이지</DialogTitle>
            </VisuallyHidden>
            <DialogDescription className="sr-only">
              나의 요금제 설정 및 정보를 확인할 수 있는 모달
            </DialogDescription>

            {/* 상단 유저 정보 */}
            <UserSection invitedCount={invitedCount} userType={userType} />

            {/* 본문 스크롤 영역 */}
            <div className="scrollbar-hide relative z-0 -mt-2 flex-1 overflow-x-hidden overflow-y-auto">
              <div className="pointer-events-none sticky -top-1 z-10 -mt-7 h-4 bg-gradient-to-b from-white to-transparent" />
              <TypeLevel invitedCount={invitedCount} typeName={userType} />
              <UserStamp />
              {/* 성향 레이더 차트 */}
              <div className="mt-7 flex w-full flex-col">
                <h2 className="text-lg text-zinc-900">콘텐츠 성향</h2>
                <Suspense fallback={<div>성향 분석 불러오는 중...</div>}>
                  <UserTendencyRadar />
                </Suspense>
              </div>

              {/* 요금제 선택 */}
              <PlanSelect
                selectedPlanId={selectedPlanId}
                setSelectedPlanId={setSelectedPlanId}
                plans={plans}
                isPlansLoading={isPlansLoading}
              />

              {/* 요금제 상세 차트 */}
              {planChartData && <PlanChart planChartData={planChartData} />}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
