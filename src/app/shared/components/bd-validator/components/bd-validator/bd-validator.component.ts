import { Component, Optional, HostBinding, Input, ViewChild, OnChanges } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../../..';
import { BdValidatorSummaryComponent } from '../bd-validator-summary';
import { isNil } from 'lodash';

@Component({
  selector: 'bd-validator',
  styleUrls: ['./bd-validator.component.scss'],
  templateUrl: './bd-validator.component.html',
})
export class BdValidatorComponent implements OnChanges {
  @Input()
  component: AbstractControl;
  @Input()
  errorDefs: any;
  @ViewChild(NgControl) controls;
  @HostBinding('class.bd-invalid')
  errorMessage: string = '';
  private get shouldShowInlineMessage() {
    return this.errorMessage && isNil(this.validatorSummary);
  }

  constructor(@Optional() private validatorSummary: BdValidatorSummaryComponent, @Optional() validationService: FormValidationService) {
    if (validationService) {
      validationService.showValidation
        .subscribe(() => this.checkErrors(this.component, true));
    }
  }

  ngOnChanges(changes: any): void {
    const component: AbstractControl = changes.component.currentValue;
    component.valueChanges.subscribe(() => {
      this.checkErrors(component);
    });
    this.checkErrors(component);
  }

  checkErrors(control, force: boolean = false) {
    this.errorMessage = '';
    const errors = control.errors;
    const shouldShow =  control.touched || force;
    if (errors && shouldShow) {
      Object.keys(this.errorDefs).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          return true;
        }
      });
    }
  }
}
