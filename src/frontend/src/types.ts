export type Timestamp = number;

export interface DailyRevenue {
  date: string;
  amount: number;
}

export interface RevenueKPI {
  totalRevenue: number;
  revenueChange: number;
  trend: DailyRevenue[];
}

export interface HealthMetrics {
  churnRate: number;
  churnRateChange: number;
  conversionRate: number;
  conversionRateChange: number;
  activeUsers: number;
  activeUsersChange: number;
}

export interface ActivityEvent {
  id: number;
  eventType: string;
  description: string;
  timestamp: Timestamp;
  userId?: number;
}

export interface TodayHighlights {
  dailyRevenue: number;
  newSignups: number;
  activityFeed: ActivityEvent[];
}

export type UserPlan = "free" | "starter" | "pro" | "enterprise";
export type UserStatus = "active" | "inactive" | "churned";

export interface User {
  id: number;
  name: string;
  email: string;
  signupDate: string;
  plan: UserPlan;
  status: UserStatus;
  totalRevenue: number;
  lastActive: string;
  sessionsLast30Days: number;
  pageViewsLast30Days: number;
}

export interface UserActivity {
  date: string;
  sessions: number;
  pageViews: number;
  revenue: number;
}

export interface UserDetail {
  user: User;
  activityHistory: UserActivity[];
  recentEvents: ActivityEvent[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
