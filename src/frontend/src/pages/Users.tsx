import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search, Users as UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import type { UserPlan, UserStatus } from "../types";

// ─── Plan badge config ────────────────────────────────────────────────────────
const PLAN_CONFIG: Record<UserPlan, { label: string; className: string }> = {
  free: {
    label: "Free",
    className: "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
  starter: {
    label: "Starter",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/15",
  },
  pro: {
    label: "Pro",
    className:
      "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
  },
  enterprise: {
    label: "Enterprise",
    className:
      "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/15",
  },
};

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  UserStatus,
  { label: string; className: string; dot: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  inactive: {
    label: "Inactive",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  churned: {
    label: "Churned",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatRevenue(amount: number): string {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
  return `$${amount.toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function relativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(dateStr);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function PlanBadge({ plan }: { plan: UserPlan }) {
  const cfg = PLAN_CONFIG[plan];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-mono font-medium tracking-wide border",
        cfg.className,
      )}
    >
      {cfg.label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border",
        cfg.className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function SkeletonRows() {
  return (
    <>
      {(["r1", "r2", "r3", "r4", "r5", "r6"] as const).map((id) => (
        <tr key={id} className="border-b border-border/50">
          <td className="py-3 px-4">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-5 w-16" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-5 w-16" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-14" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-8" />
          </td>
          <td className="py-3 px-4">
            <Skeleton className="h-4 w-4" />
          </td>
        </tr>
      ))}
    </>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <tr>
      <td colSpan={7} className="py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">No users found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasFilters
                ? "Try adjusting your search or filters"
                : "No users yet — add your first user to get started"}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<UserPlan | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  const { data: users, isLoading } = useUsers();

  const filtered = useMemo(() => {
    const source = users ?? [];
    return source.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchPlan = planFilter === "all" || u.plan === planFilter;
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      return matchSearch && matchPlan && matchStatus;
    });
  }, [users, search, planFilter, statusFilter]);

  const hasFilters =
    search !== "" || planFilter !== "all" || statusFilter !== "all";

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">
            Users
          </h1>
          <span
            data-ocid="users-count-badge"
            className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-md bg-muted text-muted-foreground text-xs font-mono font-medium border border-border"
          >
            {isLoading ? "—" : (users ?? []).length}
          </span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="users-search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 h-9 text-sm"
          />
        </div>

        {/* Plan filter */}
        <Select
          value={planFilter}
          onValueChange={(v) => setPlanFilter(v as UserPlan | "all")}
        >
          <SelectTrigger
            data-ocid="users-filter-plan"
            className="w-36 h-9 bg-card border-border text-foreground text-sm"
          >
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all" className="text-sm">
              All Plans
            </SelectItem>
            <SelectItem value="free" className="text-sm">
              Free
            </SelectItem>
            <SelectItem value="starter" className="text-sm">
              Starter
            </SelectItem>
            <SelectItem value="pro" className="text-sm">
              Pro
            </SelectItem>
            <SelectItem value="enterprise" className="text-sm">
              Enterprise
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as UserStatus | "all")}
        >
          <SelectTrigger
            data-ocid="users-filter-status"
            className="w-36 h-9 bg-card border-border text-foreground text-sm"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all" className="text-sm">
              All Statuses
            </SelectItem>
            <SelectItem value="active" className="text-sm">
              Active
            </SelectItem>
            <SelectItem value="inactive" className="text-sm">
              Inactive
            </SelectItem>
            <SelectItem value="churned" className="text-sm">
              Churned
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Results count when filtering */}
        {hasFilters && !isLoading && (
          <div className="flex items-center text-sm text-muted-foreground self-center">
            <span className="font-mono font-medium text-foreground">
              {filtered.length}
            </span>
            <span className="ml-1">
              result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="users-table">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left py-3 px-4 data-label font-medium text-muted-foreground">
                  User
                </th>
                <th className="text-left py-3 px-4 data-label font-medium text-muted-foreground">
                  Plan
                </th>
                <th className="text-left py-3 px-4 data-label font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right py-3 px-4 data-label font-medium text-muted-foreground">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 data-label font-medium text-muted-foreground hidden md:table-cell">
                  Last Active
                </th>
                <th className="text-right py-3 px-4 data-label font-medium text-muted-foreground hidden lg:table-cell">
                  Sessions
                </th>
                <th className="py-3 px-4 w-8" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonRows />
              ) : filtered.length === 0 ? (
                <EmptyState hasFilters={hasFilters} />
              ) : (
                filtered.map((user, idx) => (
                  <tr
                    key={user.id}
                    data-ocid={`user-row-${user.id}`}
                    className={cn(
                      "border-b border-border/50 transition-colors duration-150",
                      "hover:bg-muted/30 cursor-pointer group",
                      idx === filtered.length - 1 && "border-b-0",
                    )}
                  >
                    <td className="py-3 px-4">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                        className="flex flex-col gap-0.5 min-w-0"
                        aria-label={`View ${user.name}`}
                      >
                        <span className="font-medium text-foreground truncate leading-snug">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate font-mono">
                          {user.email}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <PlanBadge plan={user.plan} />
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <StatusBadge status={user.status} />
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <span
                          className={cn(
                            "font-mono font-medium text-sm tabular-nums",
                            user.totalRevenue > 0
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {formatRevenue(user.totalRevenue)}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <span className="text-xs text-muted-foreground font-mono">
                          {relativeDate(user.lastActive)}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right hidden lg:table-cell">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <span
                          className={cn(
                            "font-mono text-sm tabular-nums",
                            user.sessionsLast30Days > 0
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {user.sessionsLast30Days}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to="/users/$userId"
                        params={{ userId: String(user.id) }}
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-150" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Footer summary ── */}
      {!isLoading && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground font-mono pl-1">
          Showing{" "}
          <span className="text-foreground font-medium">{filtered.length}</span>{" "}
          of{" "}
          <span className="text-foreground font-medium">
            {(users ?? []).length}
          </span>{" "}
          users
        </p>
      )}
    </div>
  );
}
