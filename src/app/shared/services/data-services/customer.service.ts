import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Customer } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class CustomerService {

  private _addresses = [{
    streetAddress: 'Street address 1',
    secondStreetAddress: 'Street address 2',
    city: 'City',
    phone: '',
    state: 'FL state',
    zip: '33708 zip',
    fax: '',
    phoneExtension: '311',
    faxExtension: '322',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    streetAddress: 'test',
    secondStreetAddress: 'test',
    city: 'City 3',
    phone: '345345',
    state: 'Fy state',
    zip: '33708 zip',
    fax: '44',
    phoneExtension: '441',
    faxExtension: '36',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  }
];

  private _customersData: Array<Customer> = [
    { id: 1, name: 'ARP Logistic INC', address: this._addresses[0], status: 1, type: 1, taxId: '1', mc: '423466' },
    { id: 2, name: 'DNS Logistic Corp', address: this._addresses[1], status: 1, type: 1, taxId: '1', mc: '889065' },
    { id: 3, name: 'Purum Company', address: this._addresses[0], status: 1, type: 1, taxId: '1', mc: '254785' },
    { id: 4, name: 'Approximately', address: this._addresses[1], status: 1, type: 1, taxId: '1', mc: '456887' },
    { id: 5, name: 'Satisfying company', address: this._addresses[0], status: 1, type: 1, taxId: '1', mc: '123452' },
    { id: 6, name: 'Dido & CO', address: this._addresses[0], status: 1, type: 1, taxId: '1', mc: '342903' },
    { id: 7, name: 'Tydysh-tydysh', address: this._addresses[1], status: 1, type: 1, taxId: '1', mc: '678904' },
    { id: 8, name: 'Umpa Lumpa INC', address: this._addresses[0], status: 1, type: 1, taxId: '1', mc: '341112' }];

  constructor(private http: Http) {
    this.http = http;
  }

  get(id: number): Observable<Customer> {
    return Observable.of(
      this._customersData.find((customer) => id === customer.id)
    );
  }

  search(query: string): Observable<Customer[]> {
    let queryRegex = new RegExp(query, 'ig');
    return Observable.of(
      this._customersData.filter((customer: Customer) => {
        return queryRegex.test(customer.name);
      }));
  }
}
