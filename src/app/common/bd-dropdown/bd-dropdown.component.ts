import { Component, Input, EventEmitter, HostBinding, HostListener, forwardRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => { };

export const BD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CommonDropdownComponent),
  multi: true
};

@Component({
  selector: 'bd-dropdown',
  styleUrls: ['bd-dropdown.component.scss'],
  templateUrl: './bd-dropdown.component.html',
  providers: [BD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CommonDropdownComponent implements ControlValueAccessor {

  private _currentValue: any;
  private value: any;
  private _items: any[];
  private disabled: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  @Input() set items(args: any[]){
    this._items = args;
    console.log(this._items);
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public _handleDropdownHeaderClick(event): void {
    this._currentValue = undefined;
  }

  public _handleDropdownItemClick(event): void {
    this._currentValue = event.target.getAttribute('value');
  }

  @HostListener('click', ['$event'])
  public toggleDropdown(event: MouseEvent): boolean {
    event.stopPropagation();
    return false;
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
