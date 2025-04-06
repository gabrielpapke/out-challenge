import { catchError, EMPTY, finalize, OperatorFunction, pipe, tap } from 'rxjs';

export function withLoadingAndError<T>(
  setLoading: (value: boolean) => void,
  setError: (value: boolean) => void
): OperatorFunction<T, T> {
  return pipe(
    tap(() => {
      setLoading(true);
      setError(false);
    }),
    finalize(() => {
      setLoading(false);
    }),
    catchError(() => {
      setError(true);
      return EMPTY;
    })
  );
}
