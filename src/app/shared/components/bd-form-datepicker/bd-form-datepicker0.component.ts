// import { Component, Input, ViewChild, forwardRef, Optional, ChangeDetectionStrategy } from '@angular/core';
// import { NgbInputDatepicker } from '../datepicker';
// import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as moment from 'moment';
// const noop = () => { };
//
// export const BD_FORM_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => BdFormDatePicker),
//   multi: true
// };
//
// @Component({
//   selector: 'bd-form-datepicker',
//   templateUrl: './bd-form-datepicker.component.html',
//   providers: [BD_FORM_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
// })
// export class BdFormDatePicker implements ControlValueAccessor {
//   @Input() datePlaceholder: string = this.dateFormat;
//   @Input() dateFormat: string = 'MM/DD/YYYY';
//   @ViewChild('datepicker') datepicker: NgbInputDatepicker;
//   private dateValue;
//   private value: any;
//   private _onTouchedCallback: () => void = noop;
//   private _onChangeCallback: (_: any) => void = noop;
//
//   constructor() {
//   }
//
//   writeValue(value: any) {
//     debugger;
//     this.value = value;
//     this.dateValue = moment(value).format(this.dateFormat);
//   }
//
//   onDateChange(value: string) {
//     const newDate = moment(value, this.dateFormat);
//     this.dateValue = value;
//     debugger;
//     this.value = newDate ? moment(this.value)
//       .year(newDate.year())
//       .month(newDate.month())
//       .day(newDate.date()).toDate() : null;
//   }
//
//   registerOnChange(fn: any) {
//     this._onChangeCallback = fn;
//   }
//
//   registerOnTouched(fn: any) {
//     this._onTouchedCallback = fn;
//   }
//
//   onFocus() {
//     this.datepicker.open();
//   }
//
//   onClickOutside() {
//     setTimeout(() => {
//       this.datepicker.close();
//     }, 0);
//
//   }
// }
