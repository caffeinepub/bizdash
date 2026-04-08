import { useQuery } from "@tanstack/react-query";
import type { HealthMetrics, RevenueKPI, TodayHighlights } from "../types";

export function useRevenueKPI() {
  return useQuery<RevenueKPI | null>({
    queryKey: ["revenueKPI"],
    queryFn: async () => null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useHealthMetrics() {
  return useQuery<HealthMetrics | null>({
    queryKey: ["healthMetrics"],
    queryFn: async () => null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTodayHighlights() {
  return useQuery<TodayHighlights | null>({
    queryKey: ["todayHighlights"],
    queryFn: async () => null,
    staleTime: 1000 * 60 * 2,
  });
}
