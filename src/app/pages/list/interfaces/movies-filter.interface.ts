export interface IMovieFilter {
  page: number;
  size: number;
  winner: string;
  year: string;
}

export type IMovieFilterDefaultParams = Pick<IMovieFilter, 'page' | 'size'>;

export type IMovieFilterOptionalParams = Partial<
  Omit<IMovieFilter, 'page' | 'size'>
>;

export type IMovieFilterParams = Required<IMovieFilterDefaultParams> &
  IMovieFilterOptionalParams;
