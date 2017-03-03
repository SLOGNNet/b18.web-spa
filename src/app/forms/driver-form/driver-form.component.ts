import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Driver, DriverTypes, DriverPaymentOptions, LicenseClassTypes } from '../../models';
import { BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { StateService, EndorsementService, RestrictionService } from '../../shared/services';
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
  @Input() public scrollable: boolean = true;
  @Input() public submitButtonText: string = 'Save';
  @Input() public driver: Driver;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  driverForm: FormGroup;
  paymentsTypes: Array<any>;
  states: Array<any> = [];
  licenseClasses: Array<any> = [];
  endorsements: Array<any> = [];
  restrictions: Array<any> = [];


  constructor(private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    private stateService: StateService,
    private endorsementService: EndorsementService,
    private restrictionService: RestrictionService,
    elementRef: ElementRef) {
    super(elementRef);

    this.stateService.getAll().subscribe(states => this.states = states.map(value => ({ 'key': value, 'value': value })));
    this.endorsementService.getAll().subscribe(endorsements => this.endorsements = endorsements.map(value => ({ 'key': value, 'value': value })));
    this.restrictionService.getAll().subscribe(restrictions => this.restrictions = restrictions.map(value => ({ 'key': value, 'value': value })));

    this.paymentsTypes = enumHelperService.getDropdownKeyValues(DriverPaymentOptions);
    this.licenseClasses = enumHelperService.getDropdownKeyValues(LicenseClassTypes);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  submit(driver: Driver, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }

    if (driver && isValid) {
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
      paymentOption: [this.driver.paymentOption],
      stateIssued: [this.driver.license.stateIssued],
      class: [this.driver.license.class],
      number: [this.driver.license.number],
      expiration: [this.driver.license.expiration],
      dateIssued: [this.driver.license.dateIssued],
      fax: [this.driver.fax],
      email: [this.driver.email],
      ssn: [this.driver.ssn],
      rate: [this.driver.rate],
      address: this.formBuilder.group({ }),
      contactInfo: this.formBuilder.array([])
    });
  }
}
