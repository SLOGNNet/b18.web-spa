import { Injectable } from '@angular/core';
import { BdFormGroup, BdFormControl } from './models';
import { AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ViewMode } from '../enums';

function isPresent(obj: any): boolean {
  return obj != null;

}
@Injectable()
export class BdFormBuilder {
  group(controlsConfig: { [key: string]: any }, extra: { [key: string]: any } = null): BdFormGroup {
    const controls = this._reduceControls(controlsConfig);
    const validator: ValidatorFn = isPresent(extra) ? extra['validator'] : null;
    const asyncValidator: AsyncValidatorFn = isPresent(extra) ? extra['asyncValidator'] : null;
    const viewMode: AsyncValidatorFn = isPresent(extra) ? extra['asyncValidator'] : null;
    return new BdFormGroup(controls, validator, asyncValidator);
  }

  control(
    formState: Object, validator: ValidatorFn | ValidatorFn[] = null,
    asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] = null, viewMode: ViewMode = ViewMode.View): BdFormControl {
    return new BdFormControl(formState, validator, asyncValidator, viewMode);
  }

  _reduceControls(controlsConfig: { [k: string]: any }): { [key: string]: AbstractControl } {
    const controls: { [key: string]: AbstractControl } = {};
    Object.keys(controlsConfig).forEach(controlName => {
      controls[controlName] = this._createControl(controlsConfig[controlName]);
    });
    return controls;
  }

  _createControl(controlConfig: any): AbstractControl {
    if (controlConfig instanceof BdFormControl || controlConfig instanceof BdFormGroup) {
      return controlConfig;
    }
    else if (Array.isArray(controlConfig)) {
     const value = controlConfig[0];
     const validator: ValidatorFn = controlConfig.length > 1 ? controlConfig[1] : null;
     const asyncValidator: AsyncValidatorFn = controlConfig.length > 2 ? controlConfig[2] : null;
     const viewType: ViewMode = controlConfig.length > 3 ? controlConfig[3] : null;
     return this.control(value, validator, asyncValidator, viewType);

    } else {
      return this.control(
        controlConfig.formState,
        controlConfig.validator,
        controlConfig.asyncValidator,
        controlConfig.viewMode );
    }
  }
}
