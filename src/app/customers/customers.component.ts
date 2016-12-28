import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Customer } from '../models';
import { CustomerService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @ViewChild('datatable') datatable;
  private columns = [
    { prop: 'id', name: 'Customer #' },
    { prop: 'name', name: 'Name' },
    { prop: 'status', name: 'Status' }
  ];
  private selectedCustomer: Customer = null;
  private customerViewMode: ViewMode = ViewMode.Edit;
  private customers: Customer[] = new Array<Customer>();
  private isCustomerNew = false;
  private anchors = [{
    id: 'customer-basic-information',
    title: 'Basic information'
  }, {
    id: 'customer-addresses',
    title: 'Adresses'
  }, {
    id: 'customer-contacts',
    title: 'Contacts'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }];

  constructor(private customerService: CustomerService) {
    customerService.getAll().subscribe((customers) => {
      this.customers = customers;
    });
  }

  private onAddCustomer() {
    this.deselectRow();
    this.isCustomerNew = true;
    this.selectedCustomer = Customer.create();
  }

  private onCustomerSelect(customer) {
    this.isCustomerNew = false;
    this.selectedCustomer = cloneDeep(customer.selected[0]);
  }

  private onCustomerSave(customer) {
    if (this.isCustomerNew) {
      this.isCustomerNew = false;
      const createdCustomer = this.customerService.create(customer);

      if (createdCustomer) {
        this.selectedCustomer = cloneDeep(createdCustomer);
      }
    } else {
      this.customerService.update(customer);
      this.selectedCustomer = cloneDeep(customer);
    }
  }

  private onCustomerCancel(customer) {
    if (this.isCustomerNew) {
      this.isCustomerNew = false;
      this.selectedCustomer = null;
    } else {
      this.selectedCustomer = cloneDeep(this.selectedCustomer);
    }
  }

  private deselectRow() {
    this.datatable.selected = [];
  }
}
