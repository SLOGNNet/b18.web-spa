// http://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

import { FormControl } from '@angular/forms';

export class PhoneValidator {

   static isValidPhoneFormat(control: FormControl) {
      const PHONE_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (control.value !== '' && !PHONE_REGEXP.test(control.value)) {
        return {isValidPhoneFormat: true};
      }
      return null;
    }
}
