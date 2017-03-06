import { Component, Input, Output, EventEmitter } from '@angular/core';
import { includes, without, some } from 'lodash';

@Component({
  selector: 'bd-checkboxes',
  styleUrls: ['bd-checkboxes.component.scss'],
  templateUrl: './bd-checkboxes.component.html'
})
export class BdCheckboxes {
  @Input() labelText: any;
  @Input() disabled: any;
  @Input() items: Array<any>;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter();
  private _value: Array<any>;

  ngOnChanges() {
    if (this.value && this.value.split) {
      this._value = this.value.split(' ');
    }
  }

  isChecked(item) {
    return this._value.filter(v => item.value === v).length;
  }

  onCheckedChange(item) {
    if (!this.isChecked(item)) {
      this._value.push(item);
    } else {
      this._value = without(this._value, item);
    }

    this.valueChange.emit(this._value.join(' '));
  }

}
