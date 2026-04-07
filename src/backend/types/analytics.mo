module {

  // --- Shared primitive aliases ---
  public type Timestamp = Int; // nanoseconds

  // --- Revenue ---
  public type DailyRevenue = {
    date : Text; // "YYYY-MM-DD"
    amount : Float;
  };

  public type RevenueKPI = {
    totalRevenue : Float;
    revenueChange : Float; // percent change vs previous period
    trend : [DailyRevenue];  // last 30 days daily totals
  };

  // --- Business health ---
  public type HealthMetrics = {
    churnRate : Float;          // percent
    churnRateChange : Float;    // percent change vs previous period
    conversionRate : Float;     // percent
    conversionRateChange : Float;
    activeUsers : Nat;
    activeUsersChange : Float;  // percent change vs previous period
  };

  // --- Today's highlights ---
  public type ActivityEvent = {
    id : Nat;
    eventType : Text; // e.g. "signup", "purchase", "cancellation"
    description : Text;
    timestamp : Timestamp;
    userId : ?Nat;
  };

  public type TodayHighlights = {
    dailyRevenue : Float;
    newSignups : Nat;
    activityFeed : [ActivityEvent];
  };

  // --- User directory ---
  public type UserPlan = { #free; #starter; #pro; #enterprise };
  public type UserStatus = { #active; #inactive; #churned };

  public type User = {
    id : Nat;
    name : Text;
    email : Text;
    signupDate : Text; // "YYYY-MM-DD"
    plan : UserPlan;
    status : UserStatus;
    totalRevenue : Float;
    lastActive : Text; // "YYYY-MM-DD"
    sessionsLast30Days : Nat;
    pageViewsLast30Days : Nat;
  };

  // --- Per-user detail ---
  public type UserActivity = {
    date : Text; // "YYYY-MM-DD"
    sessions : Nat;
    pageViews : Nat;
    revenue : Float;
  };

  public type UserDetail = {
    user : User;
    activityHistory : [UserActivity]; // last 30 days
    recentEvents : [ActivityEvent];
  };

  // --- Date range filter ---
  public type DateRange = {
    startDate : Text; // "YYYY-MM-DD"
    endDate : Text;   // "YYYY-MM-DD"
  };
};
