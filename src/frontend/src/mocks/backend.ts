import type { backendInterface, RevenueKPI, HealthMetrics, TodayHighlights, User, UserDetail, UserActivity, ActivityEvent, DailyRevenue, UserPlan, UserStatus } from "../backend";

const generateTrend = (): DailyRevenue[] => {
  const trend: DailyRevenue[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    trend.push({
      date: d.toISOString().split("T")[0],
      amount: 30000 + Math.random() * 20000,
    });
  }
  return trend;
};

const activityFeed: ActivityEvent[] = [
  { id: BigInt(1), userId: BigInt(1), description: "New order #56381 from Alex Thompson", timestamp: BigInt(Date.now() - 3600000), eventType: "order" },
  { id: BigInt(2), userId: undefined, description: "Inventory low for item SKUA-452", timestamp: BigInt(Date.now() - 7200000), eventType: "warning" },
  { id: BigInt(3), userId: BigInt(5), description: "Payment received from Client ABC for invoice #1209", timestamp: BigInt(Date.now() - 10800000), eventType: "payment" },
  { id: BigInt(4), userId: BigInt(2), description: "New user signup: Maria Garcia", timestamp: BigInt(Date.now() - 14400000), eventType: "signup" },
  { id: BigInt(5), userId: BigInt(3), description: "Subscription upgraded to Enterprise plan", timestamp: BigInt(Date.now() - 18000000), eventType: "upgrade" },
];

const sampleUsers: User[] = [
  { id: BigInt(1), name: "Alex Thompson", email: "alex@example.com", status: "active" as unknown as UserStatus, plan: "enterprise" as unknown as UserPlan, signupDate: "2023-01-15", lastActive: "2024-04-06", totalRevenue: 12450.00, sessionsLast30Days: BigInt(42), pageViewsLast30Days: BigInt(312) },
  { id: BigInt(2), name: "Maria Garcia", email: "maria@example.com", status: "active" as unknown as UserStatus, plan: "pro" as unknown as UserPlan, signupDate: "2023-03-22", lastActive: "2024-04-07", totalRevenue: 4890.00, sessionsLast30Days: BigInt(28), pageViewsLast30Days: BigInt(198) },
  { id: BigInt(3), name: "James Wilson", email: "james@example.com", status: "inactive" as unknown as UserStatus, plan: "starter" as unknown as UserPlan, signupDate: "2023-06-01", lastActive: "2024-02-14", totalRevenue: 890.00, sessionsLast30Days: BigInt(3), pageViewsLast30Days: BigInt(21) },
  { id: BigInt(4), name: "Priya Sharma", email: "priya@example.com", status: "active" as unknown as UserStatus, plan: "pro" as unknown as UserPlan, signupDate: "2023-07-19", lastActive: "2024-04-07", totalRevenue: 5670.00, sessionsLast30Days: BigInt(35), pageViewsLast30Days: BigInt(245) },
  { id: BigInt(5), name: "Carlos Mendez", email: "carlos@example.com", status: "churned" as unknown as UserStatus, plan: "free" as unknown as UserPlan, signupDate: "2022-11-10", lastActive: "2023-12-01", totalRevenue: 0.00, sessionsLast30Days: BigInt(0), pageViewsLast30Days: BigInt(0) },
  { id: BigInt(6), name: "Sophie Laurent", email: "sophie@example.com", status: "active" as unknown as UserStatus, plan: "enterprise" as unknown as UserPlan, signupDate: "2023-02-08", lastActive: "2024-04-06", totalRevenue: 18750.00, sessionsLast30Days: BigInt(55), pageViewsLast30Days: BigInt(410) },
];

const userActivityHistory: UserActivity[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toISOString().split("T")[0],
    revenue: 100 + Math.random() * 500,
    sessions: BigInt(Math.floor(Math.random() * 5) + 1),
    pageViews: BigInt(Math.floor(Math.random() * 30) + 5),
  };
});

export const mockBackend: backendInterface = {
  getRevenueKPI: async (_dateRange) => ({
    totalRevenue: 1200000,
    revenueChange: 15.2,
    trend: generateTrend(),
  } as RevenueKPI),

  getHealthMetrics: async (_dateRange) => ({
    conversionRate: 4.8,
    conversionRateChange: 0.5,
    churnRate: 2.3,
    churnRateChange: -0.4,
    activeUsers: BigInt(3450),
    activeUsersChange: 8.1,
  } as HealthMetrics),

  getTodayHighlights: async () => ({
    dailyRevenue: 48200,
    newSignups: BigInt(23),
    activityFeed,
  } as TodayHighlights),

  getUserDetail: async (userId) => {
    const user = sampleUsers.find(u => u.id === userId) || sampleUsers[0];
    return {
      user,
      activityHistory: userActivityHistory,
      recentEvents: activityFeed.slice(0, 3),
    } as UserDetail;
  },

  listUsers: async (_search, _planFilter, _statusFilter) => sampleUsers,
};
