"use client";

import { useEffect, useState } from "react";
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

  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [planChartData, setPlanChartData] = useState<PlanDetailData | null>(
    null
  );

  // 모달이 열릴 때 유저의 현재 요금제 불러오기
  useEffect(() => {
    if (!open) return;

    async function fetchUserPlan() {
      try {
        const res = await axios.get("/api/user/my-plan");
        const userMyPlanId = res.data.my_plan;
        if (userMyPlanId) {
          setSelectedPlanId(userMyPlanId.toString());
        } else {
          setSelectedPlanId("");
        }
      } catch (err) {
        console.error("유저 요금제 정보 불러오기 실패", err);
      }
    }

    fetchUserPlan();
  }, [open]);

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
      <DialogContent className="w-[387px] max-w-md rounded-xl bg-white p-6">
        <VisuallyHidden asChild>
          <DialogTitle>마이페이지</DialogTitle>
        </VisuallyHidden>
        <DialogDescription className="sr-only">
          나의 요금제 설정 및 정보를 확인할 수 있는 모달
        </DialogDescription>
        <UserStamp />
        <UserProfile />

        <div className="mt-6 flex items-center justify-between">
          <div className="flex w-full flex-col">
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-700">
              나의 요금제
            </label>
            <select
              id="plan"
              value={selectedPlanId}
              onChange={handlePlanChange}
              className="mt-1 block rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm"
              disabled={loading || isPlansLoading}>
              <option value="">현재 사용중인 요금제를 선택해주세요</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id.toString()}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-500">
              요금제를 불러오는 중 오류가 발생했어요.
            </p>
          )}
        </div>

        {/* 차트 표시 */}
        {planChartData && (
          <div className="mt-10 w-full">
            <TendencyBarChart
              data={planChartData.bar}
              rawData={planChartData.raw}
              name={planChartData.name}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
