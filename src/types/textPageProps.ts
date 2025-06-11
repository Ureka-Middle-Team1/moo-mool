import { Message } from "./Message";

export interface TextPageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onUserSubmit: (arg: string) => void;
}
