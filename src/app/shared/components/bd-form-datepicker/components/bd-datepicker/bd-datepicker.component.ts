import { Component, Input, ViewChild, forwardRef, EventEmitter, Output, Optional, ChangeDetectionStrategy } from '@angular/core';
import { NgbInputDatepicker } from '../../../datepicker';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
const noop = () => { };

export const BD_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdDatePicker),
  multi: true
};

@Component({
  selector: 'bd-datepicker',
  templateUrl: './bd-datepicker.component.html',
  providers: [BD_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class BdDatePicker implements ControlValueAccessor {
  @Input() datePlaceholder: string;
  @Input() set value(v: any) {
    if (v !== this._value) {
      this.writeValue(v);
      this._onChangeCallback(v);
    }
  }
  @Input() format: string;
  @ViewChild('datepicker') datepicker: NgbInputDatepicker;
  @Output() valueChange = new EventEmitter();

  private _value: any;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  onValueChange(value: any) {
    this.value = value;
  }

  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.valueChange.emit(value);
    }
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  onFocus() {
    this.open();
  }

  open() {
       this.datepicker.open();
  }

  close() {
    this.datepicker.close();
  }


}
