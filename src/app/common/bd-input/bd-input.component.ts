
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


export class  CommonInputComponent {
    private state:any[] = [];
    private stateClasses:string = '';
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _value: string = '';
    private _empty: boolean = true;
    private _bdFocused: string = '';
    private _isAnimated: string = '';
    private _isInvalid: boolean = false;
    private _invalidClass: string = '';
    private _focused: boolean = false;
    private _disabled: boolean = false;
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private  coerceBooleanProperty( value: any): boolean {
      return value != null && `${value}` !== 'false';
    }
    private setInvalidState(val: boolean): void {
      val ? this._invalidClass = 'invalid' : this._invalidClass = '';
    }

  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }

    get focused() { return this._focused; }
    get empty() { return (this._value == null || this._value === '') && this.type !== 'date '; }
    get characterCount(): number {
        return this.empty ? 0 : ('' + this._value).length;
    }
    @Input() errorText: string = '';
    @Input() labelText: any;
    @Input() animated: boolean;
    @Input() name: string = null;
    @Input() type: string = 'text';
    @Input() set invalid(v: any) {
      this._isInvalid = v;
      this.setInvalidState(this._isInvalid);
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
      this.addClassIntoState('bd-focused');
      console.log(this._bdFocused);
      this.Animated(this.animated);
      this._focused = true;
      this._focusEmitter.emit(event);
      this.updateState();
    }

    set disabled(value) {
    this._disabled = this.coerceBooleanProperty(value);
    }

    Animated(animated:boolean): void{
      animated ? this._isAnimated = 'addAnimation' : this._isAnimated = '';
    }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
  }

  _handleBlur(event: FocusEvent) {
    if(this._empty) this.removeClassFromState('bd-focused');
    this.value !== '' ? this._empty = false : this._empty = true;
    this.setInvalidState(this._isInvalid);
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
    this.updateState();
  }

removeClassFromState(cl:any): void {
 this.state = this.state.filter(item => item !== cl);
}

addClassIntoState(cl:any): void {
 if(!this.state.includes(cl)) this.state.push(cl);
}


updateState(): void {
  console.log(this._isInvalid);
 if(this._isInvalid) {this.addClassIntoState('bd-invalid');}
 else {
   this.removeClassFromState('bd-invalid');
 }
 this.ConvertStateToString(this.state);
}

ConvertStateToString(arr: any[]){
    this.stateClasses = arr.map(item => item).join(' ');
    console.log(this.stateClasses,'new Arr')
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
