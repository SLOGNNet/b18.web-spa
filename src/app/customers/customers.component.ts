import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Customer } from '../models';
import { CustomerService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { CustomerStore } from '../stores';
import {  ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListDetailComponent } from '../base';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomerStore]
})
export class CustomersComponent extends BaseListDetailComponent<Customer> {
  private columns = [
    { prop: 'id', name: 'Customer #' },
    { prop: 'name', name: 'Name' },
    { prop: 'status', name: 'Status' }
  ];
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

  constructor(customerStore: CustomerStore,
    route: ActivatedRoute,
    router: Router) {
      super(customerStore, route, router);
  }

  protected itemRoute(): string {
    return 'customers/';
  }
}
