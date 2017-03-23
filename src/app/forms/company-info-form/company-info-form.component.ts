import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Company, CompanyStatuses, CompanyTypes } from '../../models';
import { EnumHelperService } from '../../shared/helpers';
import { FormValidationService } from '../../shared';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class CompanyInfoForm extends BaseForm {
  @Input() company: Company;
  @Input() disabled: boolean = false;
  @Input() scrollable: boolean = false;
  @Input() submitButtonText: string = 'Save';
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  companyForm: FormGroup;
  private companyTypes: Array<any>;
  private companyStatuses: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private validationService: FormValidationService,
    elementRef: ElementRef) {
    super(elementRef);
    this.companyTypes = enumHelperService.getDropdownKeyValues(CompanyTypes);
    this.companyStatuses = enumHelperService.getDropdownKeyValues(CompanyStatuses);
  }

  ngOnChanges(changes: any) {
    if (changes.disabled) {
      this.setFormDisabled(this.disabled);
    }

    if (changes.company) {
      this.initForm();
    }
  }

  initForm() {
    this.companyForm = this.formBuilder.group({
      id: [this.company.id],
      name: [{ value: this.company.name, disabled: this.disabled }],
      type: [{ value: this.company.type, disabled: this.disabled }],
      status: [{ value: this.company.status, disabled: this.disabled }, Validators.required],
      mc: [{ value: this.company.mc, disabled: this.disabled }, Validators.required],
      taxId: [{ value: this.company.taxId, disabled: this.disabled }],
      email: [{ value: this.company.email, disabled: this.disabled }],
      locations: [this.company.locations],
      loads: [this.company.loads],
      contacts: [this.company.contacts]
    });
  }

  setFormDisabled(isDisabled) {
    if (this.companyForm) {
      if (isDisabled) {
        this.companyForm.disable();
      } else {
        this.companyForm.enable();
      }
    }
  }

  onSave(value, isValid) {
    if (isValid) {
      this.save.emit(value);
    } else {
      this.validationService.show();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
