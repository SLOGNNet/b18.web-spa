import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html'
})
export class BdCheckbox  {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter();

  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
