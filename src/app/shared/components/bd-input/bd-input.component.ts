import { Component, Input, Output, EventEmitter,
  HostBinding, forwardRef, ViewEncapsulation,
  ElementRef, ViewChild, ChangeDetectorRef, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
const noop = () => { };
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdInputComponent {

  get focused() { return this._focused; }

  get isCollapsed() { return this.collapsibleInput && !this.focused && this.empty && this.isEmptyLabel; }

  get isEmptyLabel() {
    return !!this.labelText; }

  get characterCount(): number {
    return this.empty ? 0 : (this._value.toString()).length;
  }

  get empty() { return (this._value == null || this._value === ''); }

  get value(): any {
    return this._value;
  };

  get inputId(): string { return `${this.id}-input`; }

  @ViewChild('input') _inputElement: ElementRef;
  @ViewChild('prefix') prefixContainer: ElementRef;
  @ViewChild('suffix') suffixContainer: ElementRef;

  @Input() required: boolean = false;
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

  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }
  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }
  @Output() valueChange = new EventEmitter();
  @Output() focusChange = new EventEmitter();
  @HostBinding('class.bd-focused') _focused: boolean = false;

  private _elementType: 'input' | 'textarea';
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value: string = '';
  private _prefixEmpty: boolean = false;
  private _suffixEmpty: boolean = false;
  private _disabled: boolean = false;
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  ngAfterViewInit() {
    this.changeDetectionRef.markForCheck();
    this._prefixEmpty = this.prefixContainer.nativeElement.children.length === 0;
    this._suffixEmpty = this.suffixContainer.nativeElement.children.length === 0;
    this.changeDetectionRef.detectChanges();
  }

  constructor(private element: ElementRef,
    private changeDetectionRef: ChangeDetectorRef, private renderer: Renderer) {
    // Set the element type depending on normalized selector used(bd-input / bd-textarea)
    this._elementType = element.nativeElement.nodeName.toLowerCase() === 'bd-input' ?
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
    this.renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
    $event.preventDefault();
  }

  labelClick(event){
    if (!this.isCollapsed) {
      event.preventDefault();
    }
  }

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
    this.focusChange.emit(this._focused);
  }

  set disabled(value) {
    this._disabled = this.coerceBooleanProperty(value);
  }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
    this.valueChange.emit(this.value);
  }

  _handleKeyDown(event: Event) {
    this._onTouchedCallback();
  }

  _handleKeyUp(event: Event) {
    this._handleChange(event);
  }

  _handleBlur(event: FocusEvent) {
    const blurEvent = new Event('blur', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.element.nativeElement, 'dispatchEvent', [blurEvent]);
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
    this.focusChange.emit(this._focused);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this._value = value;
    this.changeDetectionRef.markForCheck();
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

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

}
