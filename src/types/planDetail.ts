export interface Benefit {
  imageSrc: string;
  title: string;
  description: string;
}

export interface PlanDetailData {
  name: string;
  price: string;
  tags: string[];
  radar: number[];
  bar: number[];
  raw: number[];
  compare: number[];
  compareRaw: number[];
  benefits: Benefit[];
}
