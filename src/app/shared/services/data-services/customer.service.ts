import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Customer, Address, CustomerStatuses, CustomerTypes, Contact } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';

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

  get(id: number): Observable<Customer> {
    return Observable.of(
      MockData.customers.find((customer) => id === customer.id)
    );
  }

  create(customer: Customer) {
    const newId = MockData.customers.length + 1;
    customer.id = newId;
    MockData.customers.push(customer);

    return customer;
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
    let queryRegex = new RegExp(query, 'ig');
    return Observable.of(
      MockData.customers.filter((customer: Customer) => {
        return queryRegex.test(customer.name);
      }));
  }
}
