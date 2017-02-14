import { Component, Input, Output, HostListener, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bd-checkbox',
  styleUrls: ['./bd-checkbox.component.scss'],
  templateUrl: './bd-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdCheckbox  {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(e) {
    this.checked = !this.checked;
    this.checkedChange.emit(e);
  }
}
