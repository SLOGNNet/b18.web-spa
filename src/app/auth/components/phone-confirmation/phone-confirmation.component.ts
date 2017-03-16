import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-phone-confirmation',
  templateUrl: './phone-confirmation.component.html'
})

export class PhoneConfirmationComponent implements OnInit {

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
