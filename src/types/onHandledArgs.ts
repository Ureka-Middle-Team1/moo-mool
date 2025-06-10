import { SmartChoiceApiInput } from "./smartChoiceApiInput";

export type OnHandledArgs = {
  patch?: Partial<SmartChoiceApiInput>;
  nextId?: number;
  success?: boolean;
  botMessage: string;
  error?: boolean;
};
