import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Customer, Address, CustomerStatuses, CustomerTypes } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';

@Injectable()
export class CustomerService {



  constructor(private http: Http) {
    this.http = http;
  }

  get(id: number): Observable<Customer> {
    return Observable.of(
      MockData.customers.find((customer) => id === customer.id)
    );
  }

  create(customer: Customer) {
    MockData.customers.push(customer);
  }

  search(query: string): Observable<Customer[]> {
    let queryRegex = new RegExp(query, 'ig');
    return Observable.of(
      MockData.customers.filter((customer: Customer) => {
        return queryRegex.test(customer.name);
      }));
  }
}
