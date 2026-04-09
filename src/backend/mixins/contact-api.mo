import Types "../types/contact";
import ContactLib "../lib/contact";
import List "mo:core/List";

mixin (
  messages : List.List<Types.ContactMessage>,
  nextId : { var value : Nat },
) {

  // Accepts a contact form submission and persists it.
  public shared func submitContact(name : Text, email : Text, message : Text) : async Types.SubmitResult {
    switch (ContactLib.submit(messages, nextId.value, name, email, message)) {
      case (#ok _) {
        nextId.value += 1;
        #ok;
      };
      case (#err e) #err e;
    };
  };

  // Returns all stored contact messages, newest first.
  public query func getMessages() : async [Types.ContactMessage] {
    ContactLib.getAll(messages);
  };

};
