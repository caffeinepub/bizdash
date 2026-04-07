import { useQuery } from "@tanstack/react-query";
import type { HealthMetrics, RevenueKPI, TodayHighlights } from "../types";

// --- Mock seed data ---
function generateTrend(days = 30): { date: string; amount: number }[] {
  const result: { date: string; amount: number }[] = [];
  const now = new Date();
  let base = 28000;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    base = Math.max(15000, base + (Math.random() - 0.42) * 3500);
    result.push({
      date: d.toISOString().split("T")[0],
      amount: Math.round(base),
    });
  }
  return result;
}

const MOCK_REVENUE_KPI: RevenueKPI = {
  totalRevenue: 1_248_390,
  revenueChange: 15.2,
  trend: generateTrend(30),
};

const MOCK_HEALTH_METRICS: HealthMetrics = {
  churnRate: 2.3,
  churnRateChange: -0.4,
  conversionRate: 4.8,
  conversionRateChange: 0.5,
  activeUsers: 12847,
  activeUsersChange: 8.1,
};

const now = Date.now();
const MOCK_TODAY_HIGHLIGHTS: TodayHighlights = {
  dailyRevenue: 42_150,
  newSignups: 134,
  activityFeed: [
    {
      id: 1,
      eventType: "order",
      description: "New order #56381 from Alex Thompson",
      timestamp: now - 1000 * 60 * 8,
      userId: 101,
    },
    {
      id: 2,
      eventType: "warning",
      description: "Inventory low for item SKUA-452",
      timestamp: now - 1000 * 60 * 27,
    },
    {
      id: 3,
      eventType: "payment",
      description: "Payment received from Client ABC for invoice #1209",
      timestamp: now - 1000 * 60 * 43,
      userId: 204,
    },
    {
      id: 4,
      eventType: "signup",
      description: "New user registered: sarah.kim@nexus.io",
      timestamp: now - 1000 * 60 * 71,
      userId: 318,
    },
    {
      id: 5,
      eventType: "churn",
      description: "Subscription cancelled for team workspace (Orion Labs)",
      timestamp: now - 1000 * 60 * 105,
      userId: 87,
    },
    {
      id: 6,
      eventType: "upgrade",
      description: "Account upgraded to Enterprise: DataVault Inc.",
      timestamp: now - 1000 * 60 * 142,
      userId: 55,
    },
  ],
};

export function useRevenueKPI() {
  return useQuery<RevenueKPI>({
    queryKey: ["revenueKPI"],
    queryFn: async () => MOCK_REVENUE_KPI,
    staleTime: 1000 * 60 * 5,
  });
}

export function useHealthMetrics() {
  return useQuery<HealthMetrics>({
    queryKey: ["healthMetrics"],
    queryFn: async () => MOCK_HEALTH_METRICS,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTodayHighlights() {
  return useQuery<TodayHighlights>({
    queryKey: ["todayHighlights"],
    queryFn: async () => MOCK_TODAY_HIGHLIGHTS,
    staleTime: 1000 * 60 * 2,
  });
}
