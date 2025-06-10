export type MessageType = "text" | "voice" | "summary" | "plan";

export type Message = {
  id?: string;
  role: "user" | "bot";
  content: string;
  type?: MessageType; // 기본 "text"
  createdAt?: string; // 메시지 시간
};
