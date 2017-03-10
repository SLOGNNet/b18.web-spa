import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Driver, DriverTypes, DriverPaymentTypes } from '../../models';
import { BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component(Object.assign({
  selector: 'driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class DriverForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() public scrollable: boolean = true;
  @Input() public submitButtonText: string = 'Save';
  @Input() public driver: Driver;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  driverForm: FormGroup;
  paymentsTypes: Array<any>;

  constructor(private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    private enumHelperService: EnumHelperService,
    elementRef: ElementRef) {
    super(elementRef);

    this.paymentsTypes = enumHelperService.getDropdownKeyValues(DriverPaymentTypes);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  submit(driver: Driver, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }

    if (driver && isValid) {
      this.driverForm.markAsPristine();
      this.save.emit(driver);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  initForm() {
    this.driverForm = this.formBuilder.group({
      id: [this.driver.id],
      firstName: [this.driver.firstName],
      lastName: [this.driver.lastName],
      dateOfBirth: [this.driver.dateOfBirth],
      paymentType: [this.driver.paymentType],
      ssn: [this.driver.ssn],
      rate: [this.driver.rate],
      address: this.formBuilder.group({ }),
      contactInfo: this.formBuilder.array([]),
      license: this.formBuilder.group({ })
    });
  }
}
