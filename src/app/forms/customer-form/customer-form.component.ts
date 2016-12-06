import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Customer, CustomerStatuses, CustomerTypes } from '../../models';
import { EnumHelperService } from '../../shared';
@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerForm {

  @Input() public customer: Customer;
  customerForm: FormGroup;
  customerTypes: Array<string>;
  selectedCustomerType: string;
  customerStatuses: Array<string>;
  selectedCustomerStatus: string;
  constructor(private formBuilder: FormBuilder, private enumHelperService: EnumHelperService) {
  }

  ngOnInit() {
    this.customerTypes = this.enumHelperService.getNames(CustomerTypes);
    this.selectedCustomerType = CustomerStatuses[this.customer.type];
    this.customerStatuses = this.enumHelperService.getNames(CustomerStatuses);
    this.selectedCustomerStatus = CustomerStatuses[this.customer.status];

    this.customerForm = this.formBuilder.group({
      companyName: [this.customer.companyName, Validators.required],
      mc: [this.customer.mc],
      taxId: [this.customer.taxId],
      address: this.formBuilder.group({
        steetAddress: [this.customer.address.streetAddress],
        secondStreetAddress: [this.customer.address.secondStreetAddress],
        city: [this.customer.address.city],
        phone: [this.customer.address.phone],
        fax: [this.customer.address.fax],
        state: [this.customer.address.state],
        zip: [this.customer.address.zip],
        phoneExtension: [this.customer.address.phoneExtension],
        faxExtension: [this.customer.address.phoneExtension]

      })
    });
  }
}
