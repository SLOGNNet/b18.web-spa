import { Component, Input, Optional, Output, TemplateRef, EventEmitter, HostBinding, HostListener, forwardRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { isNil } from 'lodash';
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
  @Input() toogleTemplate: TemplateRef<any>;

  @Input() clearLabel: string = '';
  @Input() defaultTitleText: string = 'Select Item';
  @Input() labelText: string;
  @Input() keyField: string = 'key';
  @Input() valueField: string = 'value';

  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onFooterClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() focusChange = new EventEmitter();

  @HostBinding('class.bd-focused') _isOpen: boolean = false;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _items: any[] = [];
  private _selectedValue: any;

  constructor(@Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get currentDisplayText(){
    let result = this.defaultTitleText;
    const selectedItem = this.getSelectedItem();
    if (selectedItem) {
      result = this.displayText(selectedItem);
    }
    return result;
  }

  getSelectedItem() {
    const selectedItem = this.items && this.items
      .find((item) => item[this.keyField] === this._selectedValue);
      return selectedItem;
  }

  displayText(item: any) {
    return item[this.valueField];
  }

  get isSelectedValue(){
    return !isNil(this.getSelectedItem());
  }

  @Input() set items(args: any[]){
    this._items = args;
  }
  get items(): any[]{
    return this._items;
  }

  @Input() set selectedValue(value: any) {
    this._selectedValue = value;
    this._onChangeCallback(this._selectedValue);
  }

  public _handleDropdownHeaderClick(event): void {
    this._selectedValue = null;
  }

  public _handleDropdownItemClick(event, item): void {
    this._selectedValue = item[this.keyField];
    this._onChangeCallback(this._selectedValue);
    this._onTouchedCallback();
    this.onItemClick.emit({key: item[this.keyField], value: item[this.valueField], item: item});
  }

  public _handleFooterClick(event): void {
    this.onFooterClick.emit(event);
  }

  onToggle(isOpen) {
    this._isOpen = isOpen;
    this.focusChange.emit(this._isOpen);
  }

  writeValue(value: any) {
    this._selectedValue = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}
