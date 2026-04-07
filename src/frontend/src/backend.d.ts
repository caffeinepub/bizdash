import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserDetail {
    user: User;
    activityHistory: Array<UserActivity>;
    recentEvents: Array<ActivityEvent>;
}
export type Timestamp = bigint;
export interface DateRange {
    endDate: string;
    startDate: string;
}
export interface TodayHighlights {
    activityFeed: Array<ActivityEvent>;
    dailyRevenue: number;
    newSignups: bigint;
}
export interface User {
    id: bigint;
    status: UserStatus;
    pageViewsLast30Days: bigint;
    signupDate: string;
    name: string;
    plan: UserPlan;
    sessionsLast30Days: bigint;
    email: string;
    totalRevenue: number;
    lastActive: string;
}
export interface RevenueKPI {
    trend: Array<DailyRevenue>;
    revenueChange: number;
    totalRevenue: number;
}
export interface HealthMetrics {
    activeUsers: bigint;
    activeUsersChange: number;
    conversionRate: number;
    conversionRateChange: number;
    churnRate: number;
    churnRateChange: number;
}
export interface ActivityEvent {
    id: bigint;
    userId?: bigint;
    description: string;
    timestamp: Timestamp;
    eventType: string;
}
export interface UserActivity {
    revenue: number;
    date: string;
    sessions: bigint;
    pageViews: bigint;
}
export interface DailyRevenue {
    date: string;
    amount: number;
}
export enum UserPlan {
    pro = "pro",
    enterprise = "enterprise",
    starter = "starter",
    free = "free"
}
export enum UserStatus {
    active = "active",
    churned = "churned",
    inactive = "inactive"
}
export interface backendInterface {
    getHealthMetrics(dateRange: DateRange | null): Promise<HealthMetrics>;
    getRevenueKPI(dateRange: DateRange | null): Promise<RevenueKPI>;
    getTodayHighlights(): Promise<TodayHighlights>;
    getUserDetail(userId: bigint): Promise<UserDetail | null>;
    listUsers(search: string | null, planFilter: UserPlan | null, statusFilter: UserStatus | null): Promise<Array<User>>;
}
