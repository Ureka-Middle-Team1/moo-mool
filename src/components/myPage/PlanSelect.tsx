"use client";

import { ChangeEvent } from "react";
import { usePostMyPlan } from "@/hooks/usePostMyPlan";

export type Plan = {
  id: number;
  name: string;
  // Add other fields as needed
};
type Props = {
  selectedPlanId: string;
  setSelectedPlanId: (id: string) => void;
  plans: Plan[];
  isPlansLoading: boolean;
};

export default function PlanSelect({
  selectedPlanId,
  setSelectedPlanId,
  plans,
  isPlansLoading,
}: Props) {
  const {
    mutate: postMyPlan,
    isPending: isSavingPlan,
    error: saveError,
  } = usePostMyPlan();

  const handlePlanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPlanId(selectedId);

    postMyPlan(
      { planId: Number(selectedId) },
      {
        onSuccess: () => console.log("요금제 저장 성공"),
        onError: (err) => console.error("요금제 저장 실패", err),
      }
    );
  };

  return (
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
          <option value="">현재 사용중인 요금제를 선택해주세요</option>
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
  );
}
