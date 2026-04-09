import Types "../types/contact";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  // Validate and build a new ContactMessage, returning an error text on bad input.
  public func submit(
    messages : List.List<Types.ContactMessage>,
    nextId : Nat,
    name : Text,
    email : Text,
    message : Text,
  ) : { #ok : Types.ContactMessage; #err : Text } {
    if (name.size() == 0) return #err "Name is required";
    if (email.size() == 0) return #err "Email is required";
    if (message.size() == 0) return #err "Message is required";
    let entry : Types.ContactMessage = {
      id = nextId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    messages.add(entry);
    #ok entry;
  };

  // Return all stored messages newest-first.
  public func getAll(messages : List.List<Types.ContactMessage>) : [Types.ContactMessage] {
    messages.toArray().reverse();
  };

};
