import { Component, Input  } from '@angular/core';
import { Validators } from '@angular/forms';
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
  @Input() public viewMode: ViewMode = ViewMode.View;
  customerForm: BdFormGroup;
  customerTypes: Array<string>;
  selectedCustomerType: string;
  customerStatuses: Array<string>;
  selectedCustomerStatus: string;
  constructor(private formBuilder: BdFormBuilder, private enumHelperService: EnumHelperService) {
  }

  controlVisible(name) {
    return this.customerForm.controlVisible(name);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.customerTypes = this.enumHelperService.getNames(CustomerTypes);
    this.customerStatuses = [ '', ...this.enumHelperService.getNames(CustomerStatuses)];

    this.customerForm = this.formBuilder.group({
      name: {
        formState: this.customer.name,
        viewMode: ViewMode.Edit
      },
      customerType: [CustomerTypes[this.customer.type]],
      status: [CustomerStatuses[this.customer.status], Validators.required],
      mc: [this.customer.mc, Validators.required],
      taxId: [this.customer.taxId],
      address: this.formBuilder.group({ })
    });
    this.customerForm.setViewMode(ViewMode.View);
  }

  onSubmit() {
    this.customerForm.submit();
  }

  onCancel() {
    const mode: ViewMode = this.customerForm.getViewMode() === ViewMode.View ? ViewMode.Edit : ViewMode.View;
    this.customerForm.setViewMode(mode);
  }
}
