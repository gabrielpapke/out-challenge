import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const yearPatternValidator = Validators.pattern(/^\d{4}$/);
    const maxYearValidator = Validators.max(new Date().getFullYear());

    const patternError = yearPatternValidator(control);
    const maxError = maxYearValidator(control);

    if (patternError || maxError) {
      return { ...patternError, ...maxError };
    }

    return null;
  };
}
