import { DateTime } from "next-auth/providers/kakao";

export type CharacterProfile = {
  user_id: string;
  plan_id: string;
  call_level: number;
  sms_level: number;
  sns_level: number;
  youtube_level: number;
  book_level: number;
  saving_level: number;
  type: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  characterProfile: CharacterProfile | null;
  age: string;
  badge: number;
  invited_count: number;
  my_plan: number;
  recommended_plan: number;
  created_at: DateTime;
};
