import { Component, Input, EventEmitter, HostBinding } from '@angular/core';
const noop = () => {};

@Component({
    selector: 'bd-input',
    styleUrls: ['bd-input.component.scss'],
    templateUrl: './bd-input.component.html'
})

export class CommonInputComponent {
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _value: string = '';
    private _empty: boolean = true;
    private _isFilled: string = '';
    private _isAnimated: string = '';
    private _focused: boolean = false;
    private _disabled: boolean = false;
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private  coerceBooleanProperty( value: any): boolean {
      return value != null && `${value}` !== 'false';
    }
    get focused() { return this._focused; }
    get empty() { return (this._value == null || this._value === '') && this.type !== 'date '; }
    get characterCount(): number {
        return this.empty ? 0 : ('' + this._value).length;
    }

    private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }

    @Input() labelText: any;
    @Input() animated: boolean;
    @Input() name: string = null;
    @Input() type: string = 'text';
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) { this._disabled = this.coerceBooleanProperty(value); }

      _handleFocus(event: FocusEvent) {
         this.Animated(this.animated);
    this._focused = true;
    this._focusEmitter.emit(event);
    }

      _handleBlur(event: FocusEvent) {
        this.value != '' ? this._empty = false : this._empty = true;
        this.changeComponentClass(this._empty);
        this._focused = false;
        this._onTouchedCallback();
        this._blurEmitter.emit(event);
  }

  changeComponentClass(val:boolean): void{
    val ? this._isFilled = '' : this._isFilled = 'filled-in';
  }

  Animated(animated:boolean): void{
    animated ? this._isAnimated = 'addAnimation' : this._isAnimated = '';
  }

    
  @Input() set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }
  get value(): any { return this._value; };
    _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
  }

} 