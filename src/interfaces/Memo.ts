export interface IMemoSimple {
  memosId?: string;
  title: string;
  content: string;
}

export interface IMemo extends IMemoSimple {
  startDate: string;
  endDate: string;
}
