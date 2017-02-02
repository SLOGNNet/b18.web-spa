import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html'
})
export class BdCheckbox  {
  private isChecked: boolean = false;

  onClick() {
    this.isChecked = !this.isChecked;
  }
}
