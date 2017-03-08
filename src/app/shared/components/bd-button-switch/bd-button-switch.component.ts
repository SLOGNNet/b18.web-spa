import { Component, Input, Output, EventEmitter, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const noop = () => { };

@Component({
  selector: 'bd-button-switch',
  styleUrls: ['./bd-button-switch.component.scss'],
  templateUrl: './bd-button-switch.component.html'
})
export class BdButtonSwitchComponent implements ControlValueAccessor  {

  @Input() labelText: string;
  @Input() hideLabel: boolean;
  @Input() disabled: boolean = false;
  @Input() items: any[];
  @Input() keyField: string = 'key';
  @Input() valueField: string = 'value';
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>(false);

  @Input() set selectedValue(v: any) {
        this._selectedValue = v;
  }
  get selectedValue(): any {
    return this._selectedValue;
  }

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _selectedValue: any;

  displayText(item: any) {
    return item[this.valueField];
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

  private isActive(element) {
    return element[this.keyField] === this.selectedValue;
  }

  private _handleItemClick(event, item){
    if (this.disabled) return;
    this.selectedValue = item[this.keyField];
    this._onChangeCallback(this.selectedValue);
    this.onItemClick.emit({key: item[this.keyField], value: item[this.valueField]});
  }
}
