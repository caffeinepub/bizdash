import Types "../types/analytics";
import List "mo:core/List";
import Order "mo:core/Order";

module {

  // ── helpers ────────────────────────────────────────────────────────────────

  // Simple daily-revenue filter: keep only entries whose date falls in range
  func filterRevenue(trend : [Types.DailyRevenue], range : ?Types.DateRange) : [Types.DailyRevenue] {
    switch range {
      case null trend;
      case (?r) trend.filter(func(d) { d.date >= r.startDate and d.date <= r.endDate });
    };
  };

  func sumRevenue(entries : [Types.DailyRevenue]) : Float {
    entries.foldLeft(0.0, func(acc, d) { acc + d.amount });
  };

  // ── Revenue KPI ────────────────────────────────────────────────────────────

  let seedTrend : [Types.DailyRevenue] = [];

  let prevPeriodTotal : Float = 0.0;

  public func getRevenueKPI(
    _users : List.List<Types.User>,
    dateRange : ?Types.DateRange,
  ) : Types.RevenueKPI {
    let trend = filterRevenue(seedTrend, dateRange);
    let total = sumRevenue(trend);
    let change = if (prevPeriodTotal == 0.0) 0.0
                 else (total - prevPeriodTotal) / prevPeriodTotal * 100.0;
    { totalRevenue = total; revenueChange = change; trend };
  };

  // ── Health metrics ─────────────────────────────────────────────────────────

  public func getHealthMetrics(
    users : List.List<Types.User>,
    _dateRange : ?Types.DateRange,
  ) : Types.HealthMetrics {
    let allUsers = users.toArray();
    let total = allUsers.size();
    let activeCount = allUsers.filter(func(u) { u.status == #active }).size();
    let churnedCount = allUsers.filter(func(u) { u.status == #churned }).size();

    let churnRate : Float = if (total == 0) 0.0
                            else churnedCount.toFloat() / total.toFloat() * 100.0;

    // Conversion: users on paid plan / total
    let paidCount = allUsers.filter(func(u) {
      u.plan == #starter or u.plan == #pro or u.plan == #enterprise
    }).size();
    let conversionRate : Float = if (total == 0) 0.0
                                 else paidCount.toFloat() / total.toFloat() * 100.0;

    {
      churnRate;
      churnRateChange = 0.0;
      conversionRate;
      conversionRateChange = 0.0;
      activeUsers = activeCount;
      activeUsersChange = 0.0;
    };
  };

  // ── Today's highlights ─────────────────────────────────────────────────────

  public func getTodayHighlights(
    users : List.List<Types.User>,
    events : List.List<Types.ActivityEvent>,
  ) : Types.TodayHighlights {
    let today = "2026-04-07";

    // Today's revenue from trend seed
    let todayRevenue : Float = switch (seedTrend.find(func(d) { d.date == today })) {
      case (?d) d.amount;
      case null 0.0;
    };

    // Count signups today (from users whose signupDate == today)
    let newSignups = users.toArray().filter(func(u) { u.signupDate == today }).size();

    // Activity feed: most recent 15 events, newest first
    let allEvents = events.toArray();
    let recent = allEvents.filter(func(e) { e.timestamp > 0 });
    // sort descending by timestamp
    let sorted = recent.sort(func(a : Types.ActivityEvent, b : Types.ActivityEvent) : Order.Order {
      if (a.timestamp > b.timestamp) #less       // descending
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    });
    let feed = sorted.sliceToArray(0, if (sorted.size() < 15) sorted.size() else 15);

    { dailyRevenue = todayRevenue; newSignups; activityFeed = feed };
  };

  // ── User directory ─────────────────────────────────────────────────────────

  public func listUsers(
    users : List.List<Types.User>,
    search : ?Text,
    planFilter : ?Types.UserPlan,
    statusFilter : ?Types.UserStatus,
  ) : [Types.User] {
    users.toArray().filter(func(u) {
      // search by name or email (case-insensitive)
      let matchesSearch = switch search {
        case null true;
        case (?q) {
          let ql = q.toLower();
          u.name.toLower().contains(#text ql) or u.email.toLower().contains(#text ql)
        };
      };
      let matchesPlan = switch planFilter {
        case null true;
        case (?p) u.plan == p;
      };
      let matchesStatus = switch statusFilter {
        case null true;
        case (?s) u.status == s;
      };
      matchesSearch and matchesPlan and matchesStatus
    });
  };

  // ── Per-user detail ────────────────────────────────────────────────────────

  // Generate 30-day activity history for a user based on their metrics
  func generateActivityHistory(user : Types.User) : [Types.UserActivity] {
    let dates = [
      "2026-03-09","2026-03-10","2026-03-11","2026-03-12","2026-03-13","2026-03-14",
      "2026-03-15","2026-03-16","2026-03-17","2026-03-18","2026-03-19","2026-03-20",
      "2026-03-21","2026-03-22","2026-03-23","2026-03-24","2026-03-25","2026-03-26",
      "2026-03-27","2026-03-28","2026-03-29","2026-03-30","2026-03-31","2026-04-01",
      "2026-04-02","2026-04-03","2026-04-04","2026-04-05","2026-04-06","2026-04-07",
    ];
    let avgSessions = if (dates.size() == 0) 0
                      else user.sessionsLast30Days / dates.size();
    let avgPageViews = if (dates.size() == 0) 0
                       else user.pageViewsLast30Days / dates.size();
    let avgRevenue = if (dates.size() == 0) 0.0
                     else user.totalRevenue / dates.size().toFloat();
    dates.map<Text, Types.UserActivity>(func(date) {
      { date; sessions = avgSessions; pageViews = avgPageViews; revenue = avgRevenue }
    });
  };

  public func getUserDetail(
    users : List.List<Types.User>,
    events : List.List<Types.ActivityEvent>,
    userId : Nat,
  ) : ?Types.UserDetail {
    switch (users.find(func(u) { u.id == userId })) {
      case null null;
      case (?user) {
        let activityHistory = generateActivityHistory(user);
        let recentEvents = events.toArray().filter(func(e) {
          switch (e.userId) {
            case (?uid) uid == userId;
            case null false;
          }
        });
        ?{ user; activityHistory; recentEvents };
      };
    };
  };
};
