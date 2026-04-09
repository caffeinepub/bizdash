import Types "types/contact";
import List "mo:core/List";
import ContactMixin "mixins/contact-api";



actor {

  let messages : List.List<Types.ContactMessage> = List.empty();
  let nextId = { var value : Nat = 0 };

  include ContactMixin(messages, nextId);

};
