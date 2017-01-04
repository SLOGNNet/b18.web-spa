import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Customer } from '../models';
import { CustomerService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { CustomerStore } from '../stores';
import { Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { CustomerDetailComponent } from './components';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomerStore]
})
export class CustomersComponent extends BaseListComponent<Customer> {
  private columns = [
    { prop: 'id', name: 'Customer #' },
    { prop: 'name', name: 'Name' },
    { prop: 'status', name: 'Status' }
  ];
    constructor(
      customerStore: CustomerStore,
      router: Router) {
      super(customerStore, router);
  }

  protected itemRoute(): string {
    return 'customers/';
  }
}
