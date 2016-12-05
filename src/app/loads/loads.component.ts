import { Component } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Address, Customer, CustomerStatuses, CustomerTypes } from '../models';

@Component({
    selector: 'loads',
    templateUrl: './loads.component.html'
})
export class LoadsComponent {
  public selectedCustomer: Customer = new Customer();
  constructor() {
    this.selectedCustomer = new Customer();
    this.selectedCustomer.companyName = 'test';
    this.selectedCustomer.status = CustomerStatuses.ACTIVE;
    this.selectedCustomer.type = CustomerTypes.Broker;
    const customerAddress = new Address();
    customerAddress.streetAddress = 'Street address 1';
    customerAddress.secondStreetAddress = 'Street address 2';
    customerAddress.city = 'City';
    customerAddress.phone = '';
    customerAddress.state = 'FL state';
    customerAddress.zip = '33708 zip';
    customerAddress.fax = '';
    this.selectedCustomer.address = customerAddress;
  }
}
