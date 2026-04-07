import { useQuery } from "@tanstack/react-query";
import type { ActivityEvent, UserActivity, UserDetail } from "../types";
import { MOCK_USERS } from "./useUsers";

function generateActivityHistory(userId: number): UserActivity[] {
  const result: UserActivity[] = [];
  const now = new Date();
  const seed = userId * 137;
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const rand = ((seed + i * 31) % 100) / 100;
    result.push({
      date: d.toISOString().split("T")[0],
      sessions: Math.floor(1 + rand * 8),
      pageViews: Math.floor(10 + rand * 60),
      revenue: Math.round(rand * 2200 * 100) / 100,
    });
  }
  return result;
}

function generateRecentEvents(userId: number): ActivityEvent[] {
  const now = Date.now();
  const templates: Array<{ eventType: string; description: string }> = [
    { eventType: "login", description: "User logged in from Chrome on macOS" },
    { eventType: "upgrade", description: "Plan upgraded to Pro tier" },
    { eventType: "payment", description: "Invoice #INV-0042 paid — $299.00" },
    { eventType: "export", description: "Exported analytics report (CSV)" },
    { eventType: "login", description: "User logged in from Mobile Safari" },
    { eventType: "settings", description: "Updated notification preferences" },
    { eventType: "api", description: "New API key generated" },
    { eventType: "support", description: "Support ticket #9871 opened" },
  ];
  return templates.map((t, i) => ({
    id: userId * 100 + i,
    eventType: t.eventType,
    description: t.description,
    timestamp: now - 1000 * 60 * (i * 43 + userId * 3),
    userId,
  }));
}

export function useUserDetail(userId: number | undefined) {
  return useQuery<UserDetail | null>({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (userId == null) return null;
      const user = MOCK_USERS.find((u) => u.id === userId);
      if (!user) return null;
      return {
        user,
        activityHistory: generateActivityHistory(userId),
        recentEvents: generateRecentEvents(userId),
      };
    },
    enabled: userId != null,
    staleTime: 1000 * 60 * 5,
  });
}
