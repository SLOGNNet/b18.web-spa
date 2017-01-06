import { Component, Input, ViewChild, forwardRef, Optional } from '@angular/core';
import { NgbInputDatepicker } from '../datepicker';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };

export const BD_FORM_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdFormDatePicker),
  multi: true
};

@Component({
  selector: 'bd-form-datepicker',
  templateUrl: './bd-form-datepicker.component.html'
})
export class BdFormDatePicker implements ControlValueAccessor {
  @Input() datePlaceholder: string = '';
  @ViewChild('datepicker') datepicker: NgbInputDatepicker;
  private model: any;
  private showDatePicker: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(@Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any) {
    this.model = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  private onFocusChange(isFocused: boolean) {
    if (isFocused) {
      this.datepicker.open();
    }
    else {
      this.datepicker.close();
    }
  }
}
