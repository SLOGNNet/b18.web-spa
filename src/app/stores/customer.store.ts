import { Injectable } from '@angular/core';
import { Customer } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { chain } from 'lodash';
import { CustomerService } from '../shared';
import { IListDataStore } from './interfaces';

@Injectable()
export class CustomerStore implements IListDataStore<Customer> {
  private _customers: BehaviorSubject<Array<Customer>> = new BehaviorSubject(Array<Customer>());
  private _selectedCustomer: BehaviorSubject<Customer> = new BehaviorSubject(null);

  constructor(private customerService: CustomerService) {

  }

  items(): Observable<Array<Customer>> {
    return this._customers.asObservable();
  }

  selectedItem(): Observable<Customer> {
    return this._selectedCustomer.asObservable();
  }

  getAll() {
    this.customerService.getAll().subscribe(loads => {
        this._customers.next(loads);
    });
  }

  public select(id: number) {
    if (id === 0) {
        this._selectedCustomer.next(Customer.create());
    }
    else {
      this._customers
        .flatMap(items => items)
        .filter(item => item.id === id)
        .defaultIfEmpty(null)
        .subscribe(load => {
          this._selectedCustomer.next(load);
        });
    }
  }

  public remove(removed: Customer) {
    this._customers.next(
      this._customers
        .getValue()
        .filter(item => item.id !== removed.id)
      );
  }

  public add(added: Customer) {
    this.customerService.create(added);
    this._customers.next([...this._customers.getValue(), added]);
  }

  public update(updated: Customer) {
    this.customerService.update(updated);
    const updateItems = this._customers
      .getValue()
      .map(item => (item.id === updated.id ? Object.assign({}, updated) : item));
    this._customers.next(updateItems);
  }
}
