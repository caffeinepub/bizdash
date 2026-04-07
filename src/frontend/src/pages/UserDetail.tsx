import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Download,
  Key,
  LifeBuoy,
  LogIn,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUserDetail } from "../hooks/useUserDetail";
import type { ActivityEvent, UserPlan, UserStatus } from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const planColors: Record<UserPlan, string> = {
  free: "bg-muted text-muted-foreground border-border",
  starter: "bg-primary/10 text-primary border-primary/30",
  pro: "bg-accent/10 text-accent-foreground border-accent/30",
  enterprise: "bg-secondary/10 text-secondary-foreground border-secondary/30",
};

const statusColors: Record<UserStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  inactive: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  churned: "bg-destructive/10 text-destructive border-destructive/30",
};

const eventIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  login: LogIn,
  upgrade: TrendingUp,
  payment: CreditCard,
  export: Download,
  settings: Settings,
  api: Key,
  support: LifeBuoy,
};

function getEventIcon(eventType: string) {
  const Icon = eventIcons[eventType] ?? Activity;
  return Icon;
}

function formatCurrency(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-5 pb-4 px-5">
        <p className="data-label mb-1">{label}</p>
        <p
          className="text-2xl font-mono font-semibold text-foreground tracking-tight"
          data-ocid="metric-value"
        >
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {subtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityEventRow({ event }: { event: ActivityEvent }) {
  const Icon = getEventIcon(event.eventType);
  const relative = formatDistanceToNow(new Date(event.timestamp), {
    addSuffix: true,
  });

  return (
    <div
      className="flex items-start gap-3 py-3 border-b border-border last:border-0"
      data-ocid="activity-row"
    >
      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug truncate">
          {event.description}
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-0.5">
          {relative}
        </p>
      </div>
    </div>
  );
}

// Custom tooltip for Recharts
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md px-3 py-2 text-xs shadow-lg">
      <p className="font-mono text-muted-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-mono" style={{ color: p.color }}>
          {p.name === "revenue"
            ? formatCurrency(p.value)
            : `${p.value} ${p.name}`}
        </p>
      ))}
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function UserDetailSkeleton() {
  return (
    <div className="space-y-6" data-ocid="user-detail-skeleton">
      <Skeleton className="h-5 w-28" />
      <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["rev", "sess", "pv", "la"] as const).map((k) => (
          <Skeleton key={k} className="h-24 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UserDetailPage() {
  const { userId } = useParams({ from: "/users/$userId" });
  const numericId = Number(userId);
  const { data, isLoading } = useUserDetail(
    Number.isNaN(numericId) ? undefined : numericId,
  );

  if (isLoading) return <UserDetailSkeleton />;

  if (!data) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-ocid="user-not-found"
      >
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          User not found
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          No user exists with ID {userId}.
        </p>
        <Link
          to="/users"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>
      </div>
    );
  }

  const { user, activityHistory, recentEvents } = data;

  // Totals from history
  const totalSessions = activityHistory.reduce((s, d) => s + d.sessions, 0);
  const totalPageViews = activityHistory.reduce((s, d) => s + d.pageViews, 0);

  // Chart: last 30 days, abbreviated date labels
  const chartData = activityHistory.map((d) => ({
    ...d,
    label: d.date.slice(5), // MM-DD
  }));

  const lastTen = recentEvents.slice(0, 10);

  return (
    <div className="space-y-6 pb-10">
      {/* Back button */}
      <Link
        to="/users"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth group"
        data-ocid="back-to-users"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-smooth" />
        Users
      </Link>

      {/* Profile header */}
      <div
        className="flex items-center gap-5 p-6 rounded-xl border border-border bg-card"
        data-ocid="user-profile-header"
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-xl font-mono font-semibold text-primary">
            {getInitials(user.name)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-foreground truncate">
            {user.name}
          </h1>
          <p className="text-sm text-muted-foreground font-mono truncate mt-0.5">
            {user.email}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs capitalize ${planColors[user.plan]}`}
              data-ocid="plan-badge"
            >
              {user.plan}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs capitalize ${statusColors[user.status]}`}
              data-ocid="status-badge"
            >
              {user.status}
            </Badge>
          </div>
        </div>

        {/* Member since */}
        <div className="flex-shrink-0 text-right hidden sm:block">
          <p className="data-label">Member since</p>
          <p className="font-mono text-sm text-foreground mt-1">
            {user.signupDate}
          </p>
        </div>
      </div>

      {/* Metrics row */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="metrics-grid"
      >
        <MetricCard
          label="Total Revenue"
          value={`$${user.totalRevenue.toLocaleString()}`}
          subtext="all time"
        />
        <MetricCard
          label="Sessions"
          value={String(totalSessions)}
          subtext="last 30 days"
        />
        <MetricCard
          label="Page Views"
          value={String(totalPageViews)}
          subtext="last 30 days"
        />
        <MetricCard label="Last Active" value={user.lastActive} />
      </div>

      {/* Activity chart */}
      <Card className="bg-card border-border" data-ocid="activity-chart">
        <CardHeader className="pb-2 px-5 pt-5">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Activity — Last 30 Days
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-4">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart
              data={chartData}
              margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 10,
                  fontFamily: "GeistMono",
                  fill: "var(--color-muted-foreground, #888)",
                }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                yAxisId="sessions"
                orientation="left"
                tick={{
                  fontSize: 10,
                  fontFamily: "GeistMono",
                  fill: "var(--color-muted-foreground, #888)",
                }}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <YAxis
                yAxisId="revenue"
                orientation="right"
                tick={{
                  fontSize: 10,
                  fontFamily: "GeistMono",
                  fill: "var(--color-muted-foreground, #888)",
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                width={36}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                yAxisId="sessions"
                dataKey="sessions"
                fill="oklch(0.65 0.18 142 / 0.45)"
                radius={[2, 2, 0, 0]}
                name="sessions"
              />
              <Line
                yAxisId="revenue"
                dataKey="revenue"
                stroke="oklch(0.72 0.16 30)"
                strokeWidth={2}
                dot={false}
                name="revenue"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent activity feed */}
      <Card className="bg-card border-border" data-ocid="activity-feed">
        <CardHeader className="pb-2 px-5 pt-5">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-2">
          {lastTen.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No recent activity recorded.
            </p>
          ) : (
            lastTen.map((event) => (
              <ActivityEventRow key={event.id} event={event} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
