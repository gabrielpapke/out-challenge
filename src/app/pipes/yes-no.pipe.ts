import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns string "Yes" or "No" based on value `true` or `false`
 */

@Pipe({
  name: 'yesNo',
  pure: true,
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
