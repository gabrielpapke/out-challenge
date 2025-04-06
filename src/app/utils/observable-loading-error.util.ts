import { catchError, EMPTY, finalize, OperatorFunction, pipe } from 'rxjs';

export function withLoadingAndError<T>(
  setLoading: (value: boolean) => void,
  setError: (value: boolean) => void
): OperatorFunction<T, T> {
  return pipe(
    finalize(() => {
      setLoading(false);
    }),
    catchError(() => {
      setError(true);
      return EMPTY;
    })
  );
}
