import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Driver, DriverPaymentOptions, DriverTypes } from '../../models';
import { FormValidationService, GoogleService } from '../../shared';
import { NgbDateStruct } from '../../shared/components/datepicker';
import { EnumHelperService } from '../../shared/helpers';
import { BaseForm } from '../base-form';

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
  driverTypes: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    private googleService: GoogleService,
    private enumHelperService: EnumHelperService,
    elementRef: ElementRef) {
    super(elementRef);

    this.paymentsTypes = enumHelperService.getDropdownKeyValues(DriverPaymentOptions);
    this.driverTypes = enumHelperService.getDropdownKeyValues(DriverTypes);
  }

  ngOnChanges(changes: any) {
    if (changes.disabled) {
      this.setFormDisabled(this.disabled);
    }

    if (changes.driver) {
      this.initForm();
    }
  }

  setFormDisabled(isDisabled) {
    if (this.driverForm) {
      if (isDisabled) {
        this.driverForm.disable();
      } else {
        this.driverForm.enable();
      }
    }
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
      firstName: [{value: this.driver.firstName, disabled: this.disabled}],
      lastName: [{value: this.driver.lastName, disabled: this.disabled}],
      type: [{value: this.driver.type, disabled: this.disabled}],
      birthDate: [{value: this.driver.birthDate, disabled: this.disabled}],
      paymentOptions: [{value: this.driver.paymentOptions, disabled: this.disabled}],
      ssn: [{value: this.driver.ssn, disabled: this.disabled}],
      rate: [{value: this.driver.rate, disabled: this.disabled}],
      address: this.formBuilder.group({}),
      contactInfo: this.formBuilder.array([]),
      license: this.formBuilder.group({})
    });
  }

  get minBirthDate(): NgbDateStruct {
    return { year: 1870, month: 1, day: 1 };
  }

  get maxBirthDate(): NgbDateStruct {
    let date: Date = new Date(),
      year: number = date.getFullYear(),
      month: number = date.getMonth() + 1,
      day: number = date.getDate();
    return { year: year, month: month, day: day };
  }
}
