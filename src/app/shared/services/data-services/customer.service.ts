import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Customer, Address, CustomerStatuses, CustomerTypes, Contact } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';
import { slice, take } from 'lodash';
@Injectable()
export class CustomerService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<Customer[]> {
    return Observable.of(
      MockData.customers
    );
  }

  getDetails(id: number): Observable<Customer> {
    return Observable.of(
      MockData.customers.find((customer) => id === customer.id)
    );
  }

  create(customer: Customer) {
    MockData.customers.push(customer);
  }

  update(customer: Customer) {
    const id = customer.id;

    MockData.customers.forEach(c => {
      if (id === c.id) {
        Object.assign(c, customer);
        return;
      }
    });
  }

  search(query: string): Observable<Customer[]> {
    return Observable.of(this._search(query));
  }

  getPaginatedSearch(query, page: number = 0, count: number = 2) {
    return Observable.of(this._getPaginated(this._search(query), page, count));
  }

  private _search(query: string) {
    let queryRegex = new RegExp(query, 'ig');
    return MockData.customers.filter((customer: Customer) => {
        return queryRegex.test(customer.name);
    });
  }

  private _getPaginated(items: Array<any>, page: number = 0, count: number = 2) {
    const offset = page * count;
    const paginatedItems = take(slice(items, offset), count);
    return paginatedItems;
  }
}
