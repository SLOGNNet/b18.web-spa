import { Component, Input, Output, Optional, EventEmitter,
  HostBinding, forwardRef, ViewEncapsulation,
  ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
const noop = () => { };
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
let nextUniqueId = 0;

export const BD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdInputComponent),
  multi: true
};

@Component({
  selector: 'bd-input, bd-textarea',
  styleUrls: ['bd-input.component.scss'],
  templateUrl: './bd-input.component.html',
  providers: [BD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: { '(click)': 'focus($event)' },
  encapsulation: ViewEncapsulation.None
})
export class BdInputComponent {

  get focused() { return this._focused; }

  get isCollapsed() { return this.collapsibleInput && !this.focused && this.empty && this.isEmptyLabel; }

  get isEmptyLabel() { return this.labelText; }

  get characterCount(): number {
    return this.empty ? 0 : ('' + this._value).length;
  }
  get empty() { return (this._value == null || this._value === ''); }

  get value(): any {
    return this._value;
  };

  get inputId(): string { return `${this.id}-input`; }

  @ViewChild('input') _inputElement: ElementRef;
  @ViewChild('prefix') prefixContainer: ElementRef;
  @ViewChild('suffix') suffixContainer: ElementRef;

  @Input() collapsibleInput: boolean = true;
  @Input() labelText: any;
  @Input() placeholder: string;
  @Input() name: string = null;
  @Input() type: string = 'text';
  @Input() id: string = `bd-${nextUniqueId++}`;

  @Input() get disabled(): boolean {
    return this._disabled;
  }
  @Input() set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  @Output() valueChange = new EventEmitter();

  private _elementType: 'input' | 'textarea';
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value: string = '';
  private _prefixEmpty: boolean = false;
  private _suffixEmpty: boolean = false;
  private _focused: boolean = false;
  private _disabled: boolean = false;
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  ngAfterViewInit() {
    this._prefixEmpty = this.prefixContainer.nativeElement.children.length === 0;
    this._suffixEmpty = this.suffixContainer.nativeElement.children.length === 0;
    this.changeDetectionRef.detectChanges();
  }

  constructor(elementRef: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    // Set the element type depending on normalized selector used(bd-input / bd-textarea)
    this._elementType = elementRef.nativeElement.nodeName.toLowerCase() === 'bd-input' ?
      'input' :
      'textarea';
  }

  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }

  _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }

  focus($event) {
    this._inputElement.nativeElement.focus();
    $event.preventDefault();
  }

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  set disabled(value) {
    this._disabled = this.coerceBooleanProperty(value);
  }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this.valueChange.emit(this.value);
    this._onTouchedCallback();
  }

  _handleBlur(event: FocusEvent) {
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this._value = value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}
