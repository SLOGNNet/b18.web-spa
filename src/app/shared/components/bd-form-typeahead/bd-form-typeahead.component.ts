import { Component, Optional, TemplateRef,
  ViewEncapsulation, HostBinding, Input, Output, EventEmitter, forwardRef,
  ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BdInputComponent } from '../bd-input';
const noop = () => { };

export const BD_FORM_TYPEAHED_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdFormTypeaheadComponent),
  multi: true
};

@Component({
  selector: 'bd-typeahead',
  templateUrl: './bd-form-typeahead.component.html',
  styleUrls: ['./bd-form-typeahead.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BD_FORM_TYPEAHED_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdFormTypeaheadComponent implements ControlValueAccessor {
  @Input() removeButtonHidden = false;
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public labelText: string = '';
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() public footerButtonText: string = '';
  @Input() public source: Observable<any>;
  @Input() public optionField: string;
  @Input() query: string;
  @Input() selected: any;
  @Output() public onSelect: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() public queryChange = new EventEmitter();
  @Output() public onRemove: EventEmitter<any> = new EventEmitter();
  @Output() public onFooterButtonClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') inputElement: BdInputComponent;
  @HostBinding('class.bd-focused') _focused: boolean = false;

  protected isLoading: boolean = false;
  protected isNoResultsShown: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
  }

  changeQuery(v: any) {
    this.query = v;
    // fire change callback only for selected from list items
    // if user change input value - consider it as empty result
    this.queryChange.emit(v);
  }

  public changeTypeaheadLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public changeTypeaheadNoResults(isNoResultsShown: boolean): void {
    this.isNoResultsShown = isNoResultsShown;
  }

  public typeaheadOnSelect(match): void {
    this.writeValue(match.item);
    this.onSelect.emit(match.item);
    this._onChangeCallback(match.item);
  }

  remove(event): void {
    if (this.disabled) return;

    event.stopPropagation();
    this.changeQuery('');
    this._onChangeCallback(null);
    this.onRemove.emit(event);
  }

  public onFooterClick(): void {
    this.changeQuery('');
    this._onChangeCallback(null);
    this.onFooterButtonClick.emit();
  }

  onFocusChanged(isFocused) {
    this._focused = isFocused;
  }

  writeValue(value: any) {
    this.query = value && this.optionField ? value[this.optionField] : value;
    this.selected = value;
    this.changeDetectionRef.markForCheck();
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
