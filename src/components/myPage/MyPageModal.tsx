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
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { getScoreContext } from "@/utils/planScore";
import { PlanDetailData } from "@/types/planDetail";
import { useSession } from "next-auth/react";
import TypeLevel from "./TypeLevel";
import { useUserStore } from "@/store/userStore";
import UserTendencyRadar from "./UserTendencyRadar";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { usePostMyPlan } from "@/hooks/usePostMyPlan";

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

  const {
    mutate: postMyPlan,
    isPending: isSavingPlan,
    error: saveError,
  } = usePostMyPlan();

  const [planChartData, setPlanChartData] = useState<PlanDetailData | null>(
    null
  );

  // 모달 열릴 때마다 최신 데이터 불러오기
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  // myPlanData 기반 상태 세팅
  useEffect(() => {
    if (!open || !session?.user?.id) return;
    if (!myPlanData) return;

    const userMyPlanId = myPlanData.my_plan ?? "";
    const userInvitedCount = myPlanData.invited_count ?? 0;
    const userType = myPlanData.type ?? null;

    setSelectedPlanId(userMyPlanId.toString());
    setInvitedCount(userInvitedCount);
    setUserType(userType);
  }, [open, session?.user?.id, myPlanData, setInvitedCount]);

  // 선택된 요금제에 따른 차트 데이터 가공
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

  // 요금제 변경 핸들러
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPlanId(selectedId);

    postMyPlan(
      { planId: Number(selectedId) },
      {
        onSuccess: () => {
          console.log("요금제 저장 성공");
        },
        onError: (err) => {
          console.error("요금제 저장 실패", err);
        },
      }
    );
  };

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

            {/* 고정 영역 */}
            <div className="relative shrink-0">
              <UserProfile invitedCount={invitedCount} />
            </div>

            {/* 스크롤 영역 */}
            <div className="scrollbar-hide relative z-0 -mt-2 flex-1 overflow-x-hidden overflow-y-auto">
              <div className="pointer-events-none sticky -top-1 z-10 -mt-7 h-4 bg-gradient-to-b from-white to-transparent" />
              <TypeLevel invitedCount={invitedCount} typeName={userType} />
              <UserStamp />
              <div className="mt-7 flex w-full flex-col">
                <h2 className="text-lg text-zinc-900">콘텐츠 성향</h2>
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
                    disabled={isSavingPlan || isPlansLoading}>
                    <option value="">
                      현재 사용중인 요금제를 선택해주세요
                    </option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id.toString()}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                  {saveError && (
                    <p className="mt-2 text-sm text-red-600">
                      요금제 저장에 실패했습니다.
                    </p>
                  )}
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
