import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubmitResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface backendInterface {
    getMessages(): Promise<Array<ContactMessage>>;
    submitContact(name: string, email: string, message: string): Promise<SubmitResult>;
}
