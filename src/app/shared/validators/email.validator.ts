import { FormControl } from '@angular/forms';


export class EmailValidator {

   static isValidMailFormat(control: FormControl){
     console.log(control.value);
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
        return {isValidMailFormat: true};
      }
      return null;
    }
}
