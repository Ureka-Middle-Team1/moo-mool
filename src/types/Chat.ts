export type MessageType = "text" | "voice" | "summary" | "plan";

export type Message = {
  id?: string;
  role: "user" | "bot";
  content: string;
  type?: MessageType; // 기본 "text"
  planData?: ParsedPlan;
};

export type RawPlan = {
  v_plan_name: { _text: string };
  v_plan_display_data: { _text: string };
  v_plan_display_voice: { _text: string };
  v_plan_display_sms: { _text: string };
  v_add_name: { _text: string };
  v_plan_price: { _text: string };
  v_tel: { _text: string };
};

export type ParsedPlan = {
  name: string;
  data: string;
  voice: string;
  sms: string;
  price: string;
  tel: string;
};

export type PlanApiResponse = {
  result: RawPlan[];
  success: boolean;
};

export function parsePlans(raw: PlanApiResponse): ParsedPlan[] {
  if (!raw.result || !Array.isArray(raw.result)) return [];

  return raw.result.map((item) => ({
    name: item.v_plan_name._text.trim(),
    data: item.v_plan_display_data._text.trim(),
    voice: item.v_plan_display_voice._text.trim(),
    sms: item.v_plan_display_sms._text.trim(),
    price: item.v_add_name._text.trim(),
    tel: item.v_tel._text.trim(),
  }));
}
