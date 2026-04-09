import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getMessages: async () => [
    {
      id: BigInt(1),
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hi Vwede, I'd love to discuss a web project with you!",
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    },
  ],
  submitContact: async (_name: string, _email: string, _message: string) => ({
    __kind__: "ok" as const,
    ok: null,
  }),
};
