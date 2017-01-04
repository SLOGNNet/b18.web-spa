import { Component } from '@angular/core';
import { Customer } from '../../models';
import { CustomerStore } from '../../stores';
import { BaseDetailComponent } from '../../base';
import {  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends BaseDetailComponent<Customer> {
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

  constructor(
    customerStore: CustomerStore,
    route: ActivatedRoute) {
      super(customerStore, route);
  }
}
