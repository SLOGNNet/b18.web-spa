import { Component, Input, ViewChild } from '@angular/core';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'bd-form-datepicker',
  templateUrl: './bd-form-datepicker.component.html'
})
export class BdFormDatePicker {
  @Input() datePlaceholder: string = '';
  model;
  private showDatePicker: boolean = false;

  private onFocusChange(isFocused: boolean) {
    this.showDatePicker = isFocused;
  }
}
