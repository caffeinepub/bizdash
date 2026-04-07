import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, subDays } from "date-fns";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Minus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserPlus,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import DateRangePicker from "../components/DateRangePicker";
import {
  useHealthMetrics,
  useRevenueKPI,
  useTodayHighlights,
} from "../hooks/useDashboard";
import type { ActivityEvent, DateRange } from "../types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function formatCount(value: number): string {
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

function defaultRange(): DateRange {
  const end = new Date();
  const start = subDays(end, 29);
  return {
    startDate: format(start, "yyyy-MM-dd"),
    endDate: format(end, "yyyy-MM-dd"),
  };
}

// ─── Trend Badge ─────────────────────────────────────────────────────────────

interface TrendBadgeProps {
  change: number;
  invertColor?: boolean;
  suffix?: string;
}

function TrendBadge({
  change,
  invertColor = false,
  suffix = "%",
}: TrendBadgeProps) {
  const isPositive = change > 0;
  const isGood = invertColor ? !isPositive : isPositive;
  const isNeutral = change === 0;

  if (isNeutral) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
        <Minus className="w-3 h-3" />0{suffix}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-mono font-medium",
        isGood ? "text-emerald-400" : "text-red-400",
      )}
    >
      {isPositive ? (
        <TrendingUp className="w-3.5 h-3.5" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5" />
      )}
      {isPositive ? "+" : ""}
      {change.toFixed(1)}
      {suffix}
    </span>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
  trend: { date: string; amount: number }[];
  invertColor?: boolean;
  accentColor?: string;
  gradientId: string;
}

function KpiCard({
  label,
  value,
  change,
  changeLabel = "vs prior period",
  trend,
  invertColor = false,
  accentColor = "#34d399",
  gradientId,
}: KpiCardProps) {
  return (
    <div
      data-ocid="kpi-card"
      className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary/30 transition-smooth"
    >
      <p className="data-label">{label}</p>

      <div className="flex items-end justify-between gap-4 min-w-0">
        <div className="min-w-0 flex-1">
          <p className="metric-value truncate">{value}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <TrendBadge change={change} invertColor={invertColor} />
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        </div>

        {trend.length > 0 && (
          <div className="w-24 h-12 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trend}
                margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={accentColor}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor={accentColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <YAxis domain={["auto", "auto"]} hide />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-popover border border-border rounded px-2 py-1 text-xs font-mono text-foreground shadow-md">
                        {formatCurrency(payload[0].value as number)}
                      </div>
                    ) : null
                  }
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={accentColor}
                  strokeWidth={1.5}
                  fill={`url(#${gradientId})`}
                  dot={false}
                  activeDot={{ r: 3, fill: accentColor }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function KpiCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3">
      <Skeleton className="h-3 w-24" />
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="w-24 h-12 rounded" />
      </div>
    </div>
  );
}

// ─── Health Metric Card ───────────────────────────────────────────────────────

interface HealthCardProps {
  label: string;
  value: string;
  change: number;
  invertColor?: boolean;
  icon: React.ReactNode;
}

function HealthCard({
  label,
  value,
  change,
  invertColor = false,
  icon,
}: HealthCardProps) {
  const isGood = change === 0 ? null : invertColor ? change < 0 : change > 0;

  return (
    <div
      data-ocid="health-card"
      className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4 hover:border-primary/30 transition-smooth"
    >
      <div className="flex items-center justify-between">
        <p className="data-label">{label}</p>
        <span className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      </div>

      <div className="flex items-end gap-3 min-w-0">
        <p className="metric-value">{value}</p>
        <div className="mb-0.5">
          <TrendBadge change={change} invertColor={invertColor} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">vs prior period</span>
        {isGood !== null && (
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5 py-0 h-4 font-mono",
              isGood
                ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                : "border-red-500/30 text-red-400 bg-red-500/10",
            )}
          >
            {isGood ? "Improving" : "Declining"}
          </Badge>
        )}
      </div>
    </div>
  );
}

function HealthCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
      <Skeleton className="h-7 w-28" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

// ─── Activity Event Icon ──────────────────────────────────────────────────────

const EVENT_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  order: {
    icon: <ShoppingCart className="w-4 h-4" />,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  payment: {
    icon: <CreditCard className="w-4 h-4" />,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  signup: {
    icon: <UserPlus className="w-4 h-4" />,
    color: "text-primary bg-primary/10 border-primary/20",
  },
  churn: {
    icon: <UserX className="w-4 h-4" />,
    color: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  upgrade: {
    icon: <ArrowUpRight className="w-4 h-4" />,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
};

function getEventConfig(eventType: string) {
  return (
    EVENT_CONFIG[eventType] ?? {
      icon: <Activity className="w-4 h-4" />,
      color: "text-muted-foreground bg-muted border-border",
    }
  );
}

function ActivityFeedItem({ event }: { event: ActivityEvent }) {
  const config = getEventConfig(event.eventType);
  return (
    <div
      data-ocid="activity-feed-item"
      className="flex items-start gap-3 py-3 border-b border-border last:border-b-0"
    >
      <span
        className={cn(
          "w-8 h-8 rounded-md border flex items-center justify-center shrink-0 mt-0.5",
          config.color,
        )}
      >
        {config.icon}
      </span>
      <p className="flex-1 min-w-0 text-sm text-foreground leading-snug break-words">
        {event.description}
      </p>
      <time className="text-xs font-mono text-muted-foreground whitespace-nowrap ml-2 mt-0.5">
        {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
      </time>
    </div>
  );
}

// ─── Today Highlight Card ─────────────────────────────────────────────────────

interface HighlightCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentClass: string;
}

function HighlightCard({
  label,
  value,
  icon,
  accentClass,
}: HighlightCardProps) {
  return (
    <div
      data-ocid="highlight-card"
      className="bg-card border border-border rounded-lg p-5 flex items-center gap-4"
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
          accentClass,
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="data-label">{label}</p>
        <p className="metric-value mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange);

  const { data: revenueKPI, isLoading: loadingRevenue } = useRevenueKPI();
  const { data: health, isLoading: loadingHealth } = useHealthMetrics();
  const { data: highlights, isLoading: loadingHighlights } =
    useTodayHighlights();

  const mrr = revenueKPI ? revenueKPI.totalRevenue / 12 : 0;
  const arr = revenueKPI ? revenueKPI.totalRevenue : 0;
  const revenuePerUser =
    revenueKPI && health ? revenueKPI.totalRevenue / health.activeUsers : 0;

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Business overview and key performance metrics
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Revenue KPI Section */}
      <section className="mb-8" aria-label="Revenue KPIs">
        <SectionHeader
          title="Revenue Overview"
          description={`${dateRange.startDate} → ${dateRange.endDate}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {loadingRevenue ? (
            ["total", "mrr", "arr", "rpu"].map((id) => (
              <KpiCardSkeleton key={id} />
            ))
          ) : revenueKPI ? (
            <>
              <KpiCard
                label="Total Revenue"
                value={formatCurrency(revenueKPI.totalRevenue)}
                change={revenueKPI.revenueChange}
                changeLabel="vs last period"
                trend={revenueKPI.trend}
                accentColor="#34d399"
                gradientId="grad-total"
              />
              <KpiCard
                label="Monthly Recurring Rev."
                value={formatCurrency(mrr)}
                change={revenueKPI.revenueChange * 0.9}
                changeLabel="vs last month"
                trend={revenueKPI.trend.slice(-14)}
                accentColor="#34d399"
                gradientId="grad-mrr"
              />
              <KpiCard
                label="Annual Recurring Rev."
                value={formatCurrency(arr)}
                change={revenueKPI.revenueChange}
                changeLabel="YoY projection"
                trend={revenueKPI.trend.slice(-14)}
                accentColor="#818cf8"
                gradientId="grad-arr"
              />
              <KpiCard
                label="Revenue per User"
                value={formatCurrency(revenuePerUser)}
                change={revenueKPI.revenueChange - 2.1}
                changeLabel="vs prior period"
                trend={revenueKPI.trend.slice(-14).map((d) => ({
                  ...d,
                  amount: d.amount / (health?.activeUsers ?? 12000),
                }))}
                accentColor="#fb923c"
                gradientId="grad-rpu"
              />
            </>
          ) : (
            <div
              className="col-span-4 flex flex-col items-center justify-center py-12 text-center"
              data-ocid="kpi-empty"
            >
              <Activity className="w-10 h-10 text-muted-foreground mb-3 opacity-40" />
              <p className="text-sm text-muted-foreground">
                No revenue data available for this period.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Business Health Section */}
      <section className="mb-8" aria-label="Business Health">
        <SectionHeader
          title="Business Health"
          description="Period-over-period performance indicators"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loadingHealth ? (
            ["churn", "conversion", "users"].map((id) => (
              <HealthCardSkeleton key={id} />
            ))
          ) : health ? (
            <>
              <HealthCard
                label="Churn Rate"
                value={`${health.churnRate.toFixed(1)}%`}
                change={health.churnRateChange}
                invertColor
                icon={<UserX className="w-4 h-4" />}
              />
              <HealthCard
                label="Conversion Rate"
                value={`${health.conversionRate.toFixed(1)}%`}
                change={health.conversionRateChange}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <HealthCard
                label="Active Users"
                value={formatCount(health.activeUsers)}
                change={health.activeUsersChange}
                icon={<Users className="w-4 h-4" />}
              />
            </>
          ) : (
            <div
              className="col-span-3 flex flex-col items-center justify-center py-12 text-center"
              data-ocid="health-empty"
            >
              <Activity className="w-10 h-10 text-muted-foreground mb-3 opacity-40" />
              <p className="text-sm text-muted-foreground">
                No health metrics available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Today's Highlights Section */}
      <section aria-label="Today's Highlights">
        <SectionHeader
          title="Today's Highlights"
          description="Live activity and today's key numbers"
        />

        {loadingHighlights ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
            </div>
            <Skeleton className="h-64 rounded-lg" />
          </div>
        ) : highlights ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HighlightCard
                label="Today's Revenue"
                value={formatCurrency(highlights.dailyRevenue)}
                icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
                accentClass="bg-emerald-500/10 border-emerald-500/20"
              />
              <HighlightCard
                label="New Signups Today"
                value={highlights.newSignups.toString()}
                icon={<UserPlus className="w-5 h-5 text-primary" />}
                accentClass="bg-primary/10 border-primary/20"
              />
            </div>

            {/* Activity Feed */}
            <div
              className="bg-card border border-border rounded-lg"
              data-ocid="activity-feed"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <p className="text-sm font-medium text-foreground">
                  Activity Feed
                </p>
                <Badge variant="outline" className="text-xs font-mono">
                  {highlights.activityFeed.length} events
                </Badge>
              </div>

              {highlights.activityFeed.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-10 text-center"
                  data-ocid="activity-empty"
                >
                  <Activity className="w-8 h-8 text-muted-foreground mb-2 opacity-40" />
                  <p className="text-sm text-muted-foreground">
                    No activity yet today.
                  </p>
                </div>
              ) : (
                <div className="px-5">
                  {highlights.activityFeed.map((event) => (
                    <ActivityFeedItem key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-12 text-center bg-card border border-border rounded-lg"
            data-ocid="highlights-empty"
          >
            <Activity className="w-10 h-10 text-muted-foreground mb-3 opacity-40" />
            <p className="text-sm text-muted-foreground">
              No highlights available.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
