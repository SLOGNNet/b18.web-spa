import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Customer, CustomerStatuses, CustomerTypes } from '../../models';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  providers: [FormValidationService],
  inputs: BaseForm.genericInputs
})
export class CustomerForm extends BaseForm {
  @Input() public customer: Customer;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  customerForm: FormGroup;
  customerTypes: Array<any>;
  selectedCustomerType: string;
  customerStatuses: Array<any>;
  selectedCustomerStatus: string;

  constructor(private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private validationService: FormValidationService) {
    super();
    this.customerTypes = enumHelperService.getDropdownKeyValues(CustomerTypes);
    this.customerStatuses = enumHelperService.getDropdownKeyValues(CustomerStatuses);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  submit(customer: Customer, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }
    if (customer && isValid) {
      this.save.emit(customer);
    }
  }

  onCancel() {
    this.customerForm.reset();
    this.cancel.emit();
  }

  initForm() {
    this.customerForm = this.formBuilder.group({
      name: [this.customer.name],
      customerType: [this.customer.type],
      status: [this.customer.status, Validators.required],
      mc: [this.customer.mc, Validators.required],
      taxId: [this.customer.taxId],
      address: this.formBuilder.group({ }),
      billingAddresses : this.formBuilder.group({ }),
      email: [this.customer.email]
    });
    //  this.customerForm.setViewMode(ViewMode.View);
  }

  sameAsCompanyChange(event) {
    if (event.target.checked) {
      }
  }

  private onExpandChanged(expanded) {
    this.isExpanded = expanded;
  }
}
