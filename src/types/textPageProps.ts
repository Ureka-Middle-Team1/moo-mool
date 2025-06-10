import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";

// 해당 Page에 들어오는 props 형태를 interface로 정의
type Message = {
  role: "user" | "bot";
  content: string;
};

export interface TextPageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onUserSubmit: (arg: string) => void;
}
