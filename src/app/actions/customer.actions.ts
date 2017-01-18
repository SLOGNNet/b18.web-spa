import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Customer } from '../models';
import { CustomerService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class CustomerActions implements IListDataActions<Customer>, IDetailDataActions<Customer> {
  static ADD_CUSTOMER: string = 'ADD_CUSTOMER';
  static REMOVE_CUSTOMER: string = 'REMOVE_CUSTOMER';
  static UPDATE_CUSTOMER: string = 'UPDATE_CUSTOMER';
  static SELECT_CUSTOMER: string = 'SELECT_CUSTOMER';
  static CREATE_NEW_CUSTOMER: string = 'CREATE_NEW_CUSTOMER';
  static GET_ALL_CUSTOMERS: string = 'GET_ALL_CUSTOMERS';
  constructor (
    private customerService: CustomerService,
    private ngRedux: NgRedux<IAppState>) {}

  add(customer: Customer): void {
    this.ngRedux.dispatch({ type: CustomerActions.ADD_CUSTOMER, customer });
  }

  remove(customer: Customer): void {
    this.ngRedux.dispatch({ type: CustomerActions.REMOVE_CUSTOMER, customer });
  }

  update(customer: Customer): void {
    this.ngRedux.dispatch({ type: CustomerActions.UPDATE_CUSTOMER, customer });
  }

  select(customerId: number): void {
    this.customerService.getDetails(customerId).subscribe(customer => {
      this.ngRedux.dispatch({ type: CustomerActions.SELECT_CUSTOMER, customer });
    });

  }

  createNew(): void {
    this.ngRedux.dispatch({ type: CustomerActions.SELECT_CUSTOMER, customer: Customer.create() });
  }

  getAll(): void {
    this.customerService.getAll().subscribe(customers => {
      this.ngRedux.dispatch({ type: CustomerActions.GET_ALL_CUSTOMERS, items: customers });
    });
  }
}
