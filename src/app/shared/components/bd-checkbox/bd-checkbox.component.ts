import { Component, Input, Output, HostListener, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdCheckbox  {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(e) {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(e);
  }
}
