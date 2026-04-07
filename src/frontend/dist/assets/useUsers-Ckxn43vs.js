import { a as useQuery } from "./badge-DN_RfSQs.js";
const MOCK_USERS = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@meridian.co",
    signupDate: "2023-02-14",
    plan: "enterprise",
    status: "active",
    totalRevenue: 48200,
    lastActive: "2026-04-07",
    sessionsLast30Days: 87,
    pageViewsLast30Days: 1243
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah.kim@nexus.io",
    signupDate: "2023-06-01",
    plan: "pro",
    status: "active",
    totalRevenue: 12850,
    lastActive: "2026-04-07",
    sessionsLast30Days: 54,
    pageViewsLast30Days: 729
  },
  {
    id: 3,
    name: "Marcus Chen",
    email: "m.chen@datavault.com",
    signupDate: "2022-11-19",
    plan: "enterprise",
    status: "active",
    totalRevenue: 97600,
    lastActive: "2026-04-06",
    sessionsLast30Days: 112,
    pageViewsLast30Days: 2187
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya@helioscorp.in",
    signupDate: "2024-01-08",
    plan: "starter",
    status: "active",
    totalRevenue: 2340,
    lastActive: "2026-04-05",
    sessionsLast30Days: 22,
    pageViewsLast30Days: 310
  },
  {
    id: 5,
    name: "Jordan Walsh",
    email: "j.walsh@orionlabs.io",
    signupDate: "2023-04-22",
    plan: "pro",
    status: "churned",
    totalRevenue: 8900,
    lastActive: "2026-03-12",
    sessionsLast30Days: 0,
    pageViewsLast30Days: 0
  },
  {
    id: 6,
    name: "Elena Vasquez",
    email: "elena.v@stackflow.dev",
    signupDate: "2023-09-14",
    plan: "pro",
    status: "active",
    totalRevenue: 14750,
    lastActive: "2026-04-07",
    sessionsLast30Days: 63,
    pageViewsLast30Days: 891
  },
  {
    id: 7,
    name: "Tom Okafor",
    email: "t.okafor@bridgecapital.ng",
    signupDate: "2024-03-02",
    plan: "free",
    status: "inactive",
    totalRevenue: 0,
    lastActive: "2026-03-29",
    sessionsLast30Days: 4,
    pageViewsLast30Days: 38
  },
  {
    id: 8,
    name: "Yuki Tanaka",
    email: "yuki@luminasoft.jp",
    signupDate: "2022-08-30",
    plan: "enterprise",
    status: "active",
    totalRevenue: 61400,
    lastActive: "2026-04-07",
    sessionsLast30Days: 98,
    pageViewsLast30Days: 1672
  },
  {
    id: 9,
    name: "Lena Petrov",
    email: "l.petrov@quantumrise.eu",
    signupDate: "2023-12-11",
    plan: "starter",
    status: "active",
    totalRevenue: 3600,
    lastActive: "2026-04-04",
    sessionsLast30Days: 19,
    pageViewsLast30Days: 245
  },
  {
    id: 10,
    name: "Carlos Mendez",
    email: "carlos@infragroup.mx",
    signupDate: "2023-07-05",
    plan: "pro",
    status: "active",
    totalRevenue: 22100,
    lastActive: "2026-04-06",
    sessionsLast30Days: 41,
    pageViewsLast30Days: 594
  }
];
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => MOCK_USERS,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  MOCK_USERS as M,
  useUsers as u
};
