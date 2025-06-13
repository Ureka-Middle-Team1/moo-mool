export type TrendDatum = {
  label: "SNS" | "Youtube" | "Chat" | "Calling" | "Books" | "Saving";
  value: number;
};

export type TrendContent = {
  type: TrendDatum["label"];
  trendData: TrendDatum[];
  descriptionText: string;
  hashtagText: string;
};
