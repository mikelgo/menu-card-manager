import {FormControl} from '@angular/forms';

export function urlValidator(control: FormControl) {
  const urlRegex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return urlRegex.test(control.value) ? null
    : {
      valid: false
    };
}
