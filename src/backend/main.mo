import Types "types/analytics";
import List "mo:core/List";
import AnalyticsMixin "mixins/analytics-api";

actor {

  let users : List.List<Types.User> = List.empty();
  let events : List.List<Types.ActivityEvent> = List.empty();

  include AnalyticsMixin(users, events);
};
