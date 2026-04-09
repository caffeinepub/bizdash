module {

  public type Timestamp = Int; // nanoseconds from Time.now()

  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Timestamp;
  };

  public type SubmitResult = { #ok; #err : Text };

};
