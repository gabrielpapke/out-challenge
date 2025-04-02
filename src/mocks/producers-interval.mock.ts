import { IProducersInterval } from '@pages/dashboard/components/producers-interval/producers-interval.interface';

export const producersIntervalMock: IProducersInterval = {
  min: [
    {
      producer: 'Producer Name',
      interval: 9,
      previousWin: 2018,
      followingWin: 2019,
    },
  ],
  max: [
    {
      producer: 'Producer Name',
      interval: 99,
      previousWin: 1900,
      followingWin: 1999,
    },
  ],
};
