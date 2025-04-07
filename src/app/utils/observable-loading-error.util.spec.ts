import { of, throwError } from 'rxjs';
import { withLoadingAndError } from './observable-loading-error.util';

describe('withLoadingAndError', () => {
  let setLoading: jasmine.Spy;
  let setError: jasmine.Spy;

  beforeEach(() => {
    setLoading = jasmine.createSpy();
    setError = jasmine.createSpy();
  });

  it('should set loading to false when the observable completes successfully', (done) => {
    of('test value')
      .pipe(withLoadingAndError(setLoading, setError))
      .subscribe({
        next: (value) => {
          expect(value).toBe('test value');
        },
        complete: () => {
          done();
        },
      });

    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('should set error to true when the observable errors out', (done) => {
    const successSpy = jasmine.createSpy('successSpy');

    throwError(() => new Error('Test error'))
      .pipe(withLoadingAndError(setLoading, setError))
      .subscribe({
        next: () => {
          successSpy();
        },
        complete: () => {
          done();
        },
      });

    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(true);
    expect(successSpy).not.toHaveBeenCalled();
  });

  it('should handle multiple emissions and finalize correctly', (done) => {
    const source$ = of(1, 2, 3);

    source$.pipe(withLoadingAndError(setLoading, setError)).subscribe({
      next: (value) => {
        expect([1, 2, 3]).toContain(value);
      },
      complete: () => {
        done();
      },
    });

    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
