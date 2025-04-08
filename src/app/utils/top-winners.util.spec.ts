import { IStudioTopWinnerItem } from '@pages/dashboard/components/top-winners/top-winners.interface';
import { getTopWinners } from './top-winners.util';

describe('getTopWinnersUtil', () => {
  it('should return the top 3 studios sorted by winCount in descending order', () => {
    const studios: IStudioTopWinnerItem[] = [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 20 },
      { name: 'Studio C', winCount: 15 },
      { name: 'Studio D', winCount: 5 },
    ];

    const result = getTopWinners(studios);

    expect(result).toEqual([
      { name: 'Studio B', winCount: 20 },
      { name: 'Studio C', winCount: 15 },
      { name: 'Studio A', winCount: 10 },
    ]);
  });

  it('should return all studios if there are less than 3', () => {
    const studios: IStudioTopWinnerItem[] = [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 20 },
    ];

    const result = getTopWinners(studios);

    expect(result).toEqual([
      { name: 'Studio B', winCount: 20 },
      { name: 'Studio A', winCount: 10 },
    ]);
  });

  it('should return an empty array if no studios are provided', () => {
    const studios: IStudioTopWinnerItem[] = [];

    const result = getTopWinners(studios);

    expect(result).toEqual([]);
  });

  it('should handle studios with the same winCount correctly', () => {
    const studios: IStudioTopWinnerItem[] = [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 10 },
      { name: 'Studio C', winCount: 15 },
      { name: 'Studio D', winCount: 5 },
    ];

    const result = getTopWinners(studios);

    expect(result).toEqual([
      { name: 'Studio C', winCount: 15 },
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 10 },
    ]);
  });
});
