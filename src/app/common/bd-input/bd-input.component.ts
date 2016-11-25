import { Component, Input, EventEmitter, HostBinding, forwardRef } from '@angular/core';
const noop = () => { };
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const BD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CommonInputComponent),
  multi: true
};

@Component({
  selector: 'bd-input',
  styleUrls: ['bd-input.component.scss'],
  templateUrl: './bd-input.component.html',
  providers: [BD_INPUT_CONTROL_VALUE_ACCESSOR]
})


export class CommonInputComponent {
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value: string = '';
  private _isInvalid: boolean = false;
  private _isDefaultView: boolean = true;
  private _focused: boolean = false;
  private _disabled: boolean = false;
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();


  private coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }

  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }

  get focused() { return this._focused; }
  get characterCount(): number {
    return this.empty ? 0 : ('' + this._value).length;
  }
  get empty() { return (this._value == null || this._value === '')}
  @Input() errorText: string = '';
  @Input() animated: boolean;
  @Input() labelText: any;
  @Input() set defaultView(v: any) {
    this._isDefaultView = v;
  };
  @Input() name: string = null;
  @Input() type: string = 'text';
  @Input() set invalid(v: any) {
    this._isInvalid = v;
  }
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
  get value(): any {
    return this._value;
  };

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  set disabled(value) {
    this._disabled = this.coerceBooleanProperty(value);
  }


  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
  }

  _handleKeyPress(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
  }

  _handleBlur(event: FocusEvent) {
    this._focused = false;
    if (!this.empty){
      this._isDefaultView = true;
    } else if (this.empty && this.animated === true) {
      this._isDefaultView = false;
    }
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
