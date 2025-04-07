import { FormControl } from '@angular/forms';
import { yearValidator } from './year.validator';

describe('yearValidator', () => {
  it('should return null for a valid year within the current year range', () => {
    const control = new FormControl('2023');
    const validator = yearValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return an error for a year with less than 4 digits', () => {
    const control = new FormControl('123');
    const validator = yearValidator();
    const result = validator(control);
    expect(result).toEqual({ pattern: jasmine.any(Object) });
  });

  it('should return an error for a year that is not numeric', () => {
    const control = new FormControl('abcd');
    const validator = yearValidator();
    const result = validator(control);
    expect(result).toEqual({ pattern: jasmine.any(Object) });
  });

  it('should return an error for a year greater than the current year', () => {
    const nextYear = new Date().getFullYear() + 1;
    const control = new FormControl(nextYear.toString());
    const validator = yearValidator();
    const result = validator(control);
    expect(result).toEqual({ max: jasmine.any(Object) });
  });

  it('should return pattern error and max null for an invalid year', () => {
    const control = new FormControl('abcd12345');
    const validator = yearValidator();
    const result = validator(control);

    expect(result).toEqual({
      pattern: jasmine.any(Object),
    });
  });

  it('should return null for the maximum valid year (current year)', () => {
    const currentYear = new Date().getFullYear();
    const control = new FormControl(currentYear.toString());
    const validator = yearValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });
});
