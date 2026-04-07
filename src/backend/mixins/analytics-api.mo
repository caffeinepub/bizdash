import Types "../types/analytics";
import AnalyticsLib "../lib/analytics";
import List "mo:core/List";

mixin (
  users : List.List<Types.User>,
  events : List.List<Types.ActivityEvent>,
) {

  // Returns revenue KPI card data with 30-day trend sparkline
  public query func getRevenueKPI(dateRange : ?Types.DateRange) : async Types.RevenueKPI {
    AnalyticsLib.getRevenueKPI(users, dateRange);
  };

  // Returns business health metrics with period-over-period comparisons
  public query func getHealthMetrics(dateRange : ?Types.DateRange) : async Types.HealthMetrics {
    AnalyticsLib.getHealthMetrics(users, dateRange);
  };

  // Returns today's highlights: daily revenue, new signups, activity feed
  public query func getTodayHighlights() : async Types.TodayHighlights {
    AnalyticsLib.getTodayHighlights(users, events);
  };

  // Returns filtered/searched user directory
  public query func listUsers(
    search : ?Text,
    planFilter : ?Types.UserPlan,
    statusFilter : ?Types.UserStatus,
  ) : async [Types.User] {
    AnalyticsLib.listUsers(users, search, planFilter, statusFilter);
  };

  // Returns per-user detail with activity history and recent events
  public query func getUserDetail(userId : Nat) : async ?Types.UserDetail {
    AnalyticsLib.getUserDetail(users, events, userId);
  };
};
