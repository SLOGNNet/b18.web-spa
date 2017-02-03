import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html'
})
export class BdCheckbox  {
  @Output() checked = new EventEmitter();
  private isChecked: boolean = false;

  onClick() {
    this.isChecked = !this.isChecked;
    this.checked.emit(this.isChecked);
  }
}
