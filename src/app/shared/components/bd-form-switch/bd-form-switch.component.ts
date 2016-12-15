import { Component, Input, Optional, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const noop = () => { };

export const BD_FORM_SWITCHL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdFormSwitchComponent),
  multi: true
};

@Component({
  selector: 'bd-form-switch',
  providers: [BD_FORM_SWITCHL_VALUE_ACCESSOR],
  templateUrl: './bd-form-switch.component.html',
  styleUrls: ['./bd-form-switch.component.scss']
})
export class BdFormSwitchComponent implements ControlValueAccessor {

  @Input() labelText: string;
  @Input() items: any[];
  @Input() selectedValue: any;
  @Input() enableButtonSwitch: boolean = false;
  @Input() defaultTitleText: string = null;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  onItemClick(item) {
    this.selectedValue = item.key;
    this._onChangeCallback(item.key);
  }

  writeValue(value: any) {
    this.selectedValue = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}