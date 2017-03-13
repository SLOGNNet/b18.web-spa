import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-auth-general-form-error',
  templateUrl: './auth-general-form-error.component.html',
  styleUrls: ['./auth-general-form-error.component.scss']
})
export class AuthGeneralFormErrorComponent {

  @Input() headerText: string;

}
