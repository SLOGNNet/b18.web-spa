import { Component, Input, Optional } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
const noop = () => { };

@Component({
  selector: 'bd-form-switch',
  templateUrl: './bd-form-switch.component.html'
})
export class BdFormSwitchComponent implements ControlValueAccessor {

  @Input() labelText: string;
  @Input() items: any[];
  @Input() selectedValue: any;
  @Input() enableButtonSwitch: boolean = false;
  @Input() defaultTitleText: string = null;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(@Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
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
