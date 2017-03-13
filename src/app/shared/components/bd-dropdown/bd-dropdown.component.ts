import { Component, Input, Optional, Output, TemplateRef, EventEmitter,
  HostBinding, HostListener, forwardRef,
  ChangeDetectionStrategy, Renderer, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'lodash';
const noop = () => { };

export const BD_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdDropdownComponent),
  multi: true
};

@Component({
  selector: 'bd-dropdown',
  styleUrls: ['bd-dropdown.component.scss'],
  templateUrl: './bd-dropdown.component.html',
  providers: [BD_DROPDOWN_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdDropdownComponent implements ControlValueAccessor {

  @Input() dropdownHeaderTemplate: TemplateRef<any>;
  @Input() dropdownFooterTemplate: TemplateRef<any>;
  @Input() dropdownItemTemplate: TemplateRef<any>;
  @Input() toogleTemplate: TemplateRef<any>;
  @Input() items: any[];
  @Input() disabled: boolean = false;
  @Input() clearLabel: string = '';
  @Input() defaultTitleText: string = 'Select Item';
  @Input() labelText: string;
  @Input() keyField: string = 'key';
  @Input() valueField: string = 'value';
  @Input() autoClose: 'nonInput' | 'always' | 'outsideClick' | 'disabled' = 'nonInput';
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onFooterClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() focusChange = new EventEmitter();

  @HostBinding('class.bd-focused') _isOpen: boolean = false;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _selectedValue: any;

  constructor(private renderer: Renderer, private elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
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

  @Input() set selectedValue(value: any) {
    this.writeValue(value);
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
    if (!isOpen) {
      const blurEvent = new Event('blur', { bubbles: true });
      this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'dispatchEvent', [blurEvent]);
    }
  }

  writeValue(value: any) {
    this._selectedValue = value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

}
