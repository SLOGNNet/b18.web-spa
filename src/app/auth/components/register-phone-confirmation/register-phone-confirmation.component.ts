import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-register-phone-confirmation',
  templateUrl: './register-phone-confirmation.component.html'
})

export class RegisterPhoneConfirmationComponent implements OnInit {

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
