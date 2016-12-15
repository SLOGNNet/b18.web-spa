import { Component, Input  } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Customer, CustomerStatuses, CustomerTypes } from '../../models';
import { EnumHelperService, BdFormBuilder, BdFormGroup } from '../../shared';
import { ViewMode } from '../../shared/enums';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerForm {

  @Input() public customer: Customer;
  @Input() public viewMode: ViewMode = ViewMode.Edit;
  @Input() isExpanded: boolean = false;

  customerForm: FormGroup;
  customerTypes: Array<any>;
  selectedCustomerType: string;
  customerStatuses: Array<any>;
  selectedCustomerStatus: string;

  private get isEditMode(): boolean {
    return this.viewMode === ViewMode.Edit;
  }

  private get isFormExpanded(): boolean {
    return this.isExpanded || this.isEditMode;
  }

  constructor(private formBuilder: FormBuilder, private enumHelperService: EnumHelperService) {
    this.customerTypes = enumHelperService.getDropdownKeyValues(CustomerTypes);
    this.customerStatuses = enumHelperService.getDropdownKeyValues(CustomerStatuses);
  }
  
  get formViewMode () {
    const mode = this.viewMode == ViewMode.Edit ? 'edit' : 'view';
    return mode;
  }

  ngOnChanges(changes: any) {
    this.initForm();
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

  onSubmit(value: Customer) {
  }

  sameAsCompanyChange(event) {
    if (event.target.checked) {
      }
  }

  onCancel() {
    this.customerForm.reset();
  }

  private onExpandChanged(expanded) {
    this.isExpanded = expanded;
  }
}
