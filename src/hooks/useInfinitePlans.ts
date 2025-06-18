import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlanDBApiResponse } from "@/types/PlanData";
import { SortTarget } from "@/types/sort";

const PAGE_SIZE = 10;

interface FetchParams {
  pageParam?: number;
  sortTarget?: SortTarget | null;
  sortOrder?: "asc" | "desc";
  selectedNetwork?: "LTE" | "5G" | null;
}

const fetchPlans = async ({
  pageParam = 0,
  sortTarget,
  sortOrder,
  selectedNetwork,
}: FetchParams): Promise<PlanDBApiResponse[]> => {
  const params = new URLSearchParams();

  params.append("page", pageParam.toString());
  params.append("size", PAGE_SIZE.toString());
  if (sortTarget) params.append("sort", sortTarget);
  if (sortOrder) params.append("order", sortOrder);
  if (selectedNetwork === "5G") params.append("network", "FIVE_G");
  else if (selectedNetwork === "LTE") params.append("network", "LTE");

  const res = await axios.get(`/api/plan/page?${params.toString()}`);
  return res.data;
};

export function useInfinitePlans(
  sortTarget: SortTarget | null,
  sortOrder: "asc" | "desc",
  selectedNetwork: "LTE" | "5G" | null
) {
  return useInfiniteQuery({
    queryKey: ["infinitePlans", sortTarget, sortOrder, selectedNetwork],
    queryFn: ({ pageParam }) =>
      fetchPlans({ pageParam, sortTarget, sortOrder, selectedNetwork }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    initialPageParam: 0,
  });
}
