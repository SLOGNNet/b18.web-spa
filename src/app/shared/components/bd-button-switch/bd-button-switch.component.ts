import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
const noop = () => { };

@Component({
  selector: 'bd-button-switch',
  styleUrls: ['./bd-button-switch.component.scss'],
  templateUrl: './bd-button-switch.component.html'
})
export class BdButtonSwitchComponent implements ControlValueAccessor {

  @Input() labelText: string;
  @Input() items: any[];

  @Input() set selectedValue(v: any) {
        this._selectedValue = v;
  }
  get selectedValue(): any {
    return this._selectedValue;
  }

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _selectedValue: any;

  writeValue(value: any) {
    this.selectedValue = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  private isActive(element) {
    return element === this.selectedValue;
  }

  private _handleItemClick(event){
    this.selectedValue = event.target.getAttribute('value');
    this._onChangeCallback(this.selectedValue);
  }
}
