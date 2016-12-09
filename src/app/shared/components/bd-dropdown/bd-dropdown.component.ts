import { Component, Input, Optional, Output, TemplateRef, EventEmitter, HostBinding, HostListener, forwardRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
const noop = () => { };

@Component({
  selector: 'bd-dropdown',
  styleUrls: ['bd-dropdown.component.scss'],
  templateUrl: './bd-dropdown.component.html'
})
export class BdDropdownComponent implements ControlValueAccessor {

  @Input() dropdownHeaderTemplate: TemplateRef<any>;
  @Input() dropdownFooterTemplate: TemplateRef<any>;
  @Input() dropdownItemTemplate: TemplateRef<any>;

  @Input() defaultTitleText: string = 'Select Item';
  @Input() labelText: string;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onFooterClick: EventEmitter<any> = new EventEmitter<any>(false);

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _items: any[];
  private _selectedValue: any;
  private value: any;

  constructor(@Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }
  get currentDisplayText(){
    return this.value ? this.value : this.defaultTitleText;
  }

  get isSelectedValue(){
    return this.value;
  }

  @Input() set items(args: any[]){
    this._items = args;
  }
  get items(): any[]{
    return this._items;
  }

  @Input() set selectedValue(v: any) {
    this._selectedValue = v;
    this.value = this._selectedValue;
    this._onChangeCallback(v);
  }

  public _handleDropdownHeaderClick(event): void {
    this.value = null;
  }

  public _handleDropdownItemClick(event): void {
    this.value = event.target.getAttribute('value');
    this._onChangeCallback(this.value);
    this.onItemClick.emit(this.value);
  }

  public _handleFooterClick(event): void {
    this.onFooterClick.emit(event);
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

}
