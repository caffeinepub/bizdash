import Types "types/analytics";
import List "mo:core/List";
import AnalyticsMixin "mixins/analytics-api";

actor {

  // ── Seed users ─────────────────────────────────────────────────────────────

  let users : List.List<Types.User> = List.fromArray([
    { id = 1;  name = "Alice Chen";      email = "alice@techcorp.io";     signupDate = "2025-10-01"; plan = #enterprise; status = #active;   totalRevenue = 9800.00;  lastActive = "2026-04-07"; sessionsLast30Days = 62; pageViewsLast30Days = 520 },
    { id = 2;  name = "Bob Martinez";    email = "bob@widgets.co";        signupDate = "2025-11-15"; plan = #pro;        status = #active;   totalRevenue = 3600.00;  lastActive = "2026-04-06"; sessionsLast30Days = 45; pageViewsLast30Days = 380 },
    { id = 3;  name = "Carol Nguyen";    email = "carol@designstudio.io"; signupDate = "2025-08-22"; plan = #pro;        status = #active;   totalRevenue = 4200.00;  lastActive = "2026-04-07"; sessionsLast30Days = 50; pageViewsLast30Days = 430 },
    { id = 4;  name = "David Okafor";    email = "david@growthco.com";    signupDate = "2026-01-10"; plan = #starter;    status = #active;   totalRevenue = 1080.00;  lastActive = "2026-04-05"; sessionsLast30Days = 28; pageViewsLast30Days = 210 },
    { id = 5;  name = "Eva Schmidt";     email = "eva@berlintech.de";     signupDate = "2025-12-03"; plan = #starter;    status = #active;   totalRevenue = 720.00;   lastActive = "2026-04-04"; sessionsLast30Days = 22; pageViewsLast30Days = 175 },
    { id = 6;  name = "Frank Liu";       email = "frank@shenzhenapp.cn";  signupDate = "2026-02-18"; plan = #free;       status = #active;   totalRevenue = 0.00;     lastActive = "2026-04-07"; sessionsLast30Days = 18; pageViewsLast30Days = 140 },
    { id = 7;  name = "Grace Kim";       email = "grace@seoulsoft.kr";    signupDate = "2025-09-30"; plan = #enterprise; status = #active;   totalRevenue = 12000.00; lastActive = "2026-04-07"; sessionsLast30Days = 71; pageViewsLast30Days = 610 },
    { id = 8;  name = "Henry Ford";      email = "henry@autoanalytics.us";signupDate = "2025-07-14"; plan = #pro;        status = #inactive; totalRevenue = 2400.00;  lastActive = "2026-03-10"; sessionsLast30Days = 5;  pageViewsLast30Days = 42  },
    { id = 9;  name = "Isla McGregor";   email = "isla@scottech.uk";      signupDate = "2026-01-25"; plan = #starter;    status = #active;   totalRevenue = 360.00;   lastActive = "2026-04-06"; sessionsLast30Days = 20; pageViewsLast30Days = 155 },
    { id = 10; name = "James Torres";    email = "james@latamgrowth.mx";  signupDate = "2025-10-20"; plan = #pro;        status = #churned;  totalRevenue = 1800.00;  lastActive = "2026-02-28"; sessionsLast30Days = 0;  pageViewsLast30Days = 0   },
    { id = 11; name = "Karen Patel";     email = "karen@mumbaitech.in";   signupDate = "2025-06-05"; plan = #enterprise; status = #active;   totalRevenue = 15600.00; lastActive = "2026-04-07"; sessionsLast30Days = 85; pageViewsLast30Days = 720 },
    { id = 12; name = "Liam O'Brien";    email = "liam@dublindev.ie";     signupDate = "2026-03-01"; plan = #free;       status = #active;   totalRevenue = 0.00;     lastActive = "2026-04-07"; sessionsLast30Days = 12; pageViewsLast30Days = 95  },
    { id = 13; name = "Mia Johansson";   email = "mia@stockholm.io";      signupDate = "2025-11-08"; plan = #starter;    status = #active;   totalRevenue = 840.00;   lastActive = "2026-04-05"; sessionsLast30Days = 25; pageViewsLast30Days = 190 },
    { id = 14; name = "Nathan Brooks";   email = "nathan@nytech.com";     signupDate = "2025-08-01"; plan = #pro;        status = #churned;  totalRevenue = 3000.00;  lastActive = "2026-01-15"; sessionsLast30Days = 0;  pageViewsLast30Days = 0   },
    { id = 15; name = "Olivia Santos";   email = "olivia@saopauloapp.br"; signupDate = "2026-02-10"; plan = #starter;    status = #active;   totalRevenue = 480.00;   lastActive = "2026-04-06"; sessionsLast30Days = 18; pageViewsLast30Days = 145 },
    { id = 16; name = "Paul Dupont";     email = "paul@paristech.fr";     signupDate = "2025-12-22"; plan = #pro;        status = #active;   totalRevenue = 2880.00;  lastActive = "2026-04-07"; sessionsLast30Days = 38; pageViewsLast30Days = 320 },
    { id = 17; name = "Quinn Zhang";     email = "quinn@tokyoapp.jp";     signupDate = "2026-01-05"; plan = #free;       status = #inactive; totalRevenue = 0.00;     lastActive = "2026-03-01"; sessionsLast30Days = 2;  pageViewsLast30Days = 18  },
    { id = 18; name = "Rachel Green";    email = "rachel@sfstartup.com";  signupDate = "2025-09-15"; plan = #enterprise; status = #active;   totalRevenue = 11200.00; lastActive = "2026-04-07"; sessionsLast30Days = 78; pageViewsLast30Days = 660 },
    { id = 19; name = "Sam Andersson";   email = "sam@malmodev.se";       signupDate = "2026-03-12"; plan = #free;       status = #active;   totalRevenue = 0.00;     lastActive = "2026-04-07"; sessionsLast30Days = 9;  pageViewsLast30Days = 72  },
    { id = 20; name = "Tina Russo";      email = "tina@milantech.it";     signupDate = "2026-02-28"; plan = #starter;    status = #active;   totalRevenue = 360.00;   lastActive = "2026-04-04"; sessionsLast30Days = 16; pageViewsLast30Days = 128 },
    { id = 21; name = "Umar Hassan";     email = "umar@lagosinno.ng";     signupDate = "2025-10-10"; plan = #pro;        status = #active;   totalRevenue = 4800.00;  lastActive = "2026-04-06"; sessionsLast30Days = 55; pageViewsLast30Days = 460 },
    { id = 22; name = "Vera Ivanova";    email = "vera@moscowsoft.ru";    signupDate = "2025-07-28"; plan = #pro;        status = #churned;  totalRevenue = 2400.00;  lastActive = "2026-01-31"; sessionsLast30Days = 0;  pageViewsLast30Days = 0   },
    { id = 23; name = "Will Thompson";   email = "will@londonapp.co.uk";  signupDate = "2026-04-07"; plan = #free;       status = #active;   totalRevenue = 0.00;     lastActive = "2026-04-07"; sessionsLast30Days = 1;  pageViewsLast30Days = 8   },
    { id = 24; name = "Xiao Wei";        email = "xiao@hangzhoutech.cn";  signupDate = "2026-04-07"; plan = #starter;    status = #active;   totalRevenue = 0.00;     lastActive = "2026-04-07"; sessionsLast30Days = 1;  pageViewsLast30Days = 10  },
  ]);

  // ── Seed activity events ───────────────────────────────────────────────────
  // Timestamps are nanoseconds. Base: 2026-03-09T00:00:00Z = 1773100800 * 1_000_000_000

  let events : List.List<Types.ActivityEvent> = List.fromArray([
    // Day 0 — 2026-03-09
    { id = 1;  eventType = "user_signup";         description = "Tina Russo signed up on starter plan";          timestamp = 1_773_100_800_000_000_000; userId = ?20  },
    { id = 2;  eventType = "payment_processed";   description = "Karen Patel renewed enterprise plan ($1300)";   timestamp = 1_773_107_200_000_000_000; userId = ?11  },
    // Day 2 — 2026-03-11
    { id = 3;  eventType = "upgrade_plan";         description = "David Okafor upgraded from free to starter";    timestamp = 1_773_273_600_000_000_000; userId = ?4   },
    { id = 4;  eventType = "payment_processed";   description = "Grace Kim paid enterprise invoice ($1000)";     timestamp = 1_773_280_000_000_000_000; userId = ?7   },
    // Day 5 — 2026-03-14
    { id = 5;  eventType = "support_ticket";      description = "Henry Ford opened ticket: export not working";  timestamp = 1_773_532_800_000_000_000; userId = ?8   },
    // Day 7 — 2026-03-16
    { id = 6;  eventType = "user_signup";         description = "Olivia Santos signed up on starter plan";       timestamp = 1_773_705_600_000_000_000; userId = ?15  },
    { id = 7;  eventType = "payment_processed";   description = "Alice Chen paid enterprise invoice ($1000)";    timestamp = 1_773_712_000_000_000_000; userId = ?1   },
    // Day 9 — 2026-03-18
    { id = 8;  eventType = "upgrade_plan";         description = "Mia Johansson upgraded free → starter";         timestamp = 1_773_878_400_000_000_000; userId = ?13  },
    { id = 9;  eventType = "user_churned";        description = "James Torres cancelled pro subscription";       timestamp = 1_773_885_000_000_000_000; userId = ?10  },
    // Day 11 — 2026-03-20
    { id = 10; eventType = "payment_processed";   description = "Rachel Green paid enterprise invoice ($1200)";  timestamp = 1_774_051_200_000_000_000; userId = ?18  },
    { id = 11; eventType = "support_ticket";      description = "Eva Schmidt asked about API rate limits";       timestamp = 1_774_057_600_000_000_000; userId = ?5   },
    // Day 14 — 2026-03-23
    { id = 12; eventType = "upgrade_plan";         description = "Bob Martinez upgraded starter → pro";           timestamp = 1_774_310_400_000_000_000; userId = ?2   },
    { id = 13; eventType = "payment_processed";   description = "Umar Hassan paid pro invoice ($400)";          timestamp = 1_774_316_800_000_000_000; userId = ?21  },
    // Day 16 — 2026-03-25
    { id = 14; eventType = "user_signup";         description = "Sam Andersson signed up (free plan)";          timestamp = 1_774_483_200_000_000_000; userId = ?19  },
    { id = 15; eventType = "user_churned";        description = "Vera Ivanova cancelled pro subscription";       timestamp = 1_774_489_600_000_000_000; userId = ?22  },
    // Day 18 — 2026-03-27
    { id = 16; eventType = "payment_processed";   description = "Paul Dupont paid pro invoice ($400)";          timestamp = 1_774_656_000_000_000_000; userId = ?16  },
    { id = 17; eventType = "support_ticket";      description = "Liam O'Brien asked about upgrading plan";      timestamp = 1_774_662_400_000_000_000; userId = ?12  },
    // Day 19 — 2026-03-28
    { id = 18; eventType = "upgrade_plan";         description = "Liam O'Brien upgraded free → starter";         timestamp = 1_774_742_400_000_000_000; userId = ?12  },
    // Day 21 — 2026-03-30
    { id = 19; eventType = "payment_processed";   description = "Karen Patel paid enterprise invoice ($1300)";  timestamp = 1_774_915_200_000_000_000; userId = ?11  },
    { id = 20; eventType = "user_signup";         description = "Liam O'Brien signed up (free plan)";           timestamp = 1_774_921_600_000_000_000; userId = ?12  },
    // Day 23 — 2026-04-01
    { id = 21; eventType = "payment_processed";   description = "Carol Nguyen paid pro invoice ($400)";         timestamp = 1_775_088_000_000_000_000; userId = ?3   },
    { id = 22; eventType = "support_ticket";      description = "Quinn Zhang reported login issue";             timestamp = 1_775_094_400_000_000_000; userId = ?17  },
    // Day 25 — 2026-04-03
    { id = 23; eventType = "payment_processed";   description = "Grace Kim paid enterprise invoice ($1000)";    timestamp = 1_775_260_800_000_000_000; userId = ?7   },
    { id = 24; eventType = "user_churned";        description = "Nathan Brooks cancelled pro subscription";     timestamp = 1_775_267_200_000_000_000; userId = ?14  },
    // Day 27 — 2026-04-05
    { id = 25; eventType = "upgrade_plan";         description = "Isla McGregor upgraded free → starter";        timestamp = 1_775_433_600_000_000_000; userId = ?9   },
    { id = 26; eventType = "payment_processed";   description = "Alice Chen paid enterprise invoice ($1000)";   timestamp = 1_775_440_000_000_000_000; userId = ?1   },
    // Day 28 — 2026-04-06
    { id = 27; eventType = "payment_processed";   description = "Rachel Green paid enterprise invoice ($1200)"; timestamp = 1_775_520_000_000_000_000; userId = ?18  },
    { id = 28; eventType = "support_ticket";      description = "Bob Martinez asked about dashboard export";    timestamp = 1_775_526_400_000_000_000; userId = ?2   },
    // Day 29 — 2026-04-07 (today)
    { id = 29; eventType = "user_signup";         description = "Will Thompson signed up (free plan)";         timestamp = 1_775_606_400_000_000_000; userId = ?23  },
    { id = 30; eventType = "user_signup";         description = "Xiao Wei signed up on starter plan";          timestamp = 1_775_610_000_000_000_000; userId = ?24  },
    { id = 31; eventType = "payment_processed";   description = "Umar Hassan paid pro invoice ($400)";         timestamp = 1_775_613_600_000_000_000; userId = ?21  },
    { id = 32; eventType = "upgrade_plan";         description = "Frank Liu upgraded free → starter";           timestamp = 1_775_617_200_000_000_000; userId = ?6   },
    { id = 33; eventType = "payment_processed";   description = "Karen Patel auto-renewed enterprise plan";    timestamp = 1_775_620_800_000_000_000; userId = ?11  },
  ]);

  include AnalyticsMixin(users, events);
};
