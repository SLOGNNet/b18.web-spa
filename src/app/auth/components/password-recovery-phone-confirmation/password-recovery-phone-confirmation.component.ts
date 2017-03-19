import { Component } from '@angular/core';

import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-password-recovery-phone-confirmation',
  templateUrl: './password-recovery-phone-confirmation.component.html'
})

export class PasswordRecoveryPhoneConfirmationComponent {

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
