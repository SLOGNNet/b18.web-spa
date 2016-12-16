import { FormControl, FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ViewMode } from '../enums';

interface IBdControlInterface {
    setViewMode(viewMode: ViewMode): void;
    getViewMode(): ViewMode;
    isVisible(): boolean;
}

export class BdFormGroup extends FormGroup implements IBdControlInterface {
  private _submitted: boolean = false;
  private _viewMode: ViewMode = ViewMode.View;
  constructor(
    public controls: { [key: string]: AbstractControl }, validator: ValidatorFn = null,
    asyncValidator: AsyncValidatorFn = null) {
      super(controls, validator, asyncValidator);
  }

  public submit() {
    this._submitted = true;
  }

  reset(value?: any, options?: Object) {
    this._submitted = false;
    super.reset(value, options);
  }

  controlVisible(name: string): boolean {
    const control: IBdControlInterface  = <IBdControlInterface> <any> this.get(name);
    return control && control.isVisible();
  }

  isVisible(): boolean {
    return true;
  }

  // implements IViewModeInterface
  setViewMode(viewMode: ViewMode) {
    this._viewMode = viewMode;
    this._forEachChild((control: IBdControlInterface) => {
      control.setViewMode(viewMode);
    });
  }

  getViewMode(): ViewMode {
    return this._viewMode;
  }

  public updateValueAndValidity({onlySelf, emitEvent}: {onlySelf?: boolean, emitEvent?: boolean} = {}) {
    if (this._submitted) {
      super.updateValueAndValidity({onlySelf, emitEvent});
    }
  }

  /** @internal */
  _forEachChild(cb: (v: any, k: string) => void): void {
    Object.keys(this.controls).forEach(k => cb(this.controls[k], k));
  }
}

export class BdFormControl extends FormControl implements IBdControlInterface {
  private _allowedViewMode: ViewMode;
  private _currentViewMode: ViewMode;
  isVisible(): boolean {
    return !!(this._allowedViewMode & this._currentViewMode);
  }

  setViewMode(viewMode: ViewMode) {
    this._currentViewMode = viewMode;
  }

  getViewMode(): ViewMode {
    return this._currentViewMode;
  }
  constructor(
    formState: any = null, validator: ValidatorFn|ValidatorFn[] = null,
    asyncValidator: AsyncValidatorFn|AsyncValidatorFn[] = null,
    allowedViewMode: ViewMode = ViewMode.View) {
      super(formState, validator, asyncValidator);
      this._allowedViewMode = allowedViewMode;
  };
}
