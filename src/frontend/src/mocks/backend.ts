import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getRevenueKPI: async (_dateRange) => ({
    totalRevenue: 0,
    revenueChange: 0,
    trend: [],
  }),

  getHealthMetrics: async (_dateRange) => ({
    conversionRate: 0,
    conversionRateChange: 0,
    churnRate: 0,
    churnRateChange: 0,
    activeUsers: BigInt(0),
    activeUsersChange: 0,
  }),

  getTodayHighlights: async () => ({
    dailyRevenue: 0,
    newSignups: BigInt(0),
    activityFeed: [],
  }),

  getUserDetail: async (_userId) => null,

  listUsers: async (_search, _planFilter, _statusFilter) => [],
};
