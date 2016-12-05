import { Component, Input, ChangeDetectorRef  } from '@angular/core';
import { Validators } from '@angular/forms';
import { Customer, CustomerStatuses, CustomerTypes } from '../../models';
import { EnumHelperService, BdFormBuilder, BdFormGroup } from '../../shared';
import { ViewMode } from '../../shared/enums';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerForm {

  @Input() public customer: Customer;
  customerForm: BdFormGroup;
  customerTypes: Array<string>;
  selectedCustomerType: string;
  customerStatuses: Array<string>;
  selectedCustomerStatus: string;
  constructor(private formBuilder: BdFormBuilder, private enumHelperService: EnumHelperService, private cdr: ChangeDetectorRef) {
  }

  controlVisible(name) {
    return this.customerForm.controlVisible(name);
  }

  ngOnInit() {
    this.customerTypes = this.enumHelperService.getNames(CustomerTypes);
    this.selectedCustomerType = CustomerStatuses[this.customer.type];
    this.customerStatuses = this.enumHelperService.getNames(CustomerStatuses);
    this.selectedCustomerStatus = CustomerStatuses[this.customer.status];

    this.customerForm = this.formBuilder.group({
      companyName: {
        formState: this.customer.companyName,
        validators: Validators.required,
        viewMode: ViewMode.Edit
      },
      mc: [this.customer.mc],
      taxId: [this.customer.taxId],
      address: this.formBuilder.group({
        steetAddress: [this.customer.address.streetAddress, Validators.required]
      })
    });
    this.customerForm.setViewMode(ViewMode.View);
  }

  submit() {
    this.customerForm.submit();
  }

  changeMode() {
    const mode: ViewMode = this.customerForm.getViewMode() === ViewMode.View ? ViewMode.Edit : ViewMode.View;
    this.customerForm.setViewMode(mode);
    this.cdr.detectChanges();
  }
}
