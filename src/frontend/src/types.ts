export interface ContactMessage {
  id: bigint;
  name: string;
  email: string;
  message: string;
  timestamp: bigint;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}
