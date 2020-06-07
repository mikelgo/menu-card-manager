import {FormControl} from '@angular/forms';

export function zipCodeValidator(control: FormControl) {
  const zipCodeRegex = new RegExp('\\d{5}');
  return zipCodeRegex.test(control.value)
    ? null
    : {
        valid: false
      };
}
