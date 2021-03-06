import { Component, Input, forwardRef } from '@angular/core';
import { without } from 'lodash';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'lodash';
const noop = () => { };

const BD_CHECKBOXES_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdCheckboxes),
  multi: true
};

@Component({
  selector: 'bd-checkboxes',
  styleUrls: ['bd-checkboxes.component.scss'],
  templateUrl: './bd-checkboxes.component.html',
  providers: [BD_CHECKBOXES_CONTROL_VALUE_ACCESSOR]
})
export class BdCheckboxes implements ControlValueAccessor {
  @Input() labelText: any;
  @Input() disabled: boolean = false;
  @Input() items: Array<any>;
  @Input()
  set value(v: string) {
    if (!isNil(v)) this._value = v.trim().length ? v.split(' ') : [];
  }
  get value(): string {
    return this._value.join(' ');
  }
  private _value: Array<any> = [];
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  isChecked(item) {
    return this._value.filter(v => item === v).length;
  }

  onCheckedChange(item) {
    if (!this.isChecked(item)) {
      this._value.push(item);
    } else {
      this._value = without(this._value, item);
    }

    this._onChangeCallback(this.value);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
