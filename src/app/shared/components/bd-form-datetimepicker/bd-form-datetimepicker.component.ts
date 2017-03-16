import { Component, Input, ViewChild, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Constants } from '../../constants/constants';

import { BdDatePicker } from '../bd-form-datepicker/components';

const noop = () => { };

export const BD_FORM_DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdFormDateTimePicker),
  multi: true
};

@Component({
  selector: 'bd-form-datetimepicker',
  templateUrl: './bd-form-datetimepicker.component.html',
  styleUrls: ['bd-form-datetimepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BD_FORM_DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class BdFormDateTimePicker implements ControlValueAccessor {

  @Input() dateFormat: string = this.constants.DATE_FORMAT;
  @ViewChild('datepicker') datepicker: BdDatePicker;

  private dateValue;
  private value: any;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(private constants: Constants) {
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
      this.dateValue = moment(value).format(this.dateFormat);
    }
  }

  onDateChange(value: string) {
    if (value && value !== this.dateValue) {
      this.value = moment(value).toDate();
      this._onChangeCallback(this.value);
    }
  }

  onTimeChange(value: string) {
    if (value) {
      let _values = value.split(':');
      let hours = +_values[0];
      let minutes = +_values[1];
      this.value = moment(this.value).hours(hours).minutes(minutes).toDate();
      this._onChangeCallback(this.value);
    }
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  onClickOutside() {
    this.datepicker.close();
  }

}
