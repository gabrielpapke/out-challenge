export interface IProducerIntervalItem {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface IProducersInterval {
  min: IProducerIntervalItem[];
  max: IProducerIntervalItem[];
}
