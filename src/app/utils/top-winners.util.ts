import { IStudioTopWinnerItem } from '@pages/dashboard/components/top-winners/top-winners.interface';

export const getTopWinners = (studios: IStudioTopWinnerItem[]) => {
  return studios.sort((a, b) => b.winCount - a.winCount).slice(0, 3);
};
