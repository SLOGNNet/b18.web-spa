import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdCheckbox  {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter();

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
