import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlanDBApiResponse } from "@/types/PlanData";
import { SortTarget } from "@/types/sort";

const PAGE_SIZE = 5;

interface InfinitePlanResponse {
  data: PlanDBApiResponse[];
  hasNext: boolean;
}

interface FetchParams {
  pageParam?: number;
  sortTarget?: SortTarget | null;
  sortOrder?: "asc" | "desc";
  selectedNetwork?: "LTE" | "5G" | null;
  selectedOttList?: string[];
}

const fetchPlans = async ({
  pageParam = 0,
  sortTarget,
  sortOrder,
  selectedNetwork,
  selectedOttList,
}: FetchParams): Promise<InfinitePlanResponse> => {
  const params = new URLSearchParams();

  params.append("page", pageParam.toString());
  params.append("size", PAGE_SIZE.toString());
  if (sortTarget) params.append("sort", sortTarget);
  if (sortOrder) params.append("order", sortOrder);
  if (selectedNetwork === "5G") params.append("network", "FIVE_G");
  else if (selectedNetwork === "LTE") params.append("network", "LTE");

  if (selectedOttList && selectedOttList.length > 0) {
    params.append("ott", selectedOttList.join(","));
  }

  const res = await axios.get<InfinitePlanResponse>(
    `/api/plan/page?${params.toString()}`
  );
  return res.data;
};

export function useInfinitePlans(
  sortTarget: SortTarget | null,
  sortOrder: "asc" | "desc",
  selectedNetwork: "LTE" | "5G" | null,
  selectedOttList: string[]
) {
  return useInfiniteQuery({
    queryKey: ["infinitePlans", sortTarget, sortOrder, selectedNetwork, selectedOttList], // ✅ 키에 포함
    queryFn: ({ pageParam = 0 }) =>
      fetchPlans({ pageParam, sortTarget, sortOrder, selectedNetwork, selectedOttList }), // ✅ 전달
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
    initialPageParam: 0,
  });
}
