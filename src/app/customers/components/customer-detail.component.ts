import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from '../../models';
import { BaseDetailComponent } from '../../base';
import {  ActivatedRoute, Params } from '@angular/router';
import { CustomerActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    customerActions: CustomerActions,
    route: ActivatedRoute,
    ngRedux: NgRedux<IAppState>) {
      super(customerActions, ngRedux.select(state => state.customers.selected), route);
  }
}
