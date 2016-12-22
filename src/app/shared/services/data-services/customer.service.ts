import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Customer, Address, CustomerStatuses, CustomerTypes } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class CustomerService {

  private _addresses: Array<Address> = [{
    id: 1,
    name: 'Address 1',
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
    id: 2,
    name: 'Address 2',
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

private _billingAddresses = [{
  id: 3,
  name: 'Billing Address 1',
  streetAddress: 'billing street address 1',
  secondStreetAddress: 'Street address 2',
  city: 'City',
  phone: '2221',
  state: 'FL state',
  zip: '33708 zip',
  fax: '',
  phoneExtension: '355',
  faxExtension: '377',
  location: {
    lat: 0,
    lng: 0
  }
},
{
  id: 4,
  name: 'Billing Address 2',
  streetAddress: 'billing street address 2',
  secondStreetAddress: 'test',
  city: 'City 3',
  phone: '345345',
  state: 'Fy state',
  zip: '33708 zip',
  fax: '44',
  phoneExtension: '455',
  faxExtension: '477',
  location: {
   lat: 0,
   lng: 0
  }
}
];

  private _customersData: Array<Customer> = [
    { id: 1, name: 'ARP Logistic INC', addresses: this._addresses, email: 'qwerty1@gmail.com',
      status: CustomerStatuses.Active, type: CustomerTypes.Broker, taxId: '1', mc: '423466' },
    { id: 2, name: 'DNS Logistic Corp', addresses: this._billingAddresses, email: 'qwerty2@gmail.com',
      status: CustomerStatuses.Unavaliable, type: CustomerTypes.Shipper,  taxId: '1', mc: '889065' },
    { id: 3, name: 'Purum Company', addresses: this._addresses, email: 'qwerty3@gmail.com',
      status: CustomerStatuses.Inactive, type: CustomerTypes.Broker, taxId: '1', mc: '254785' },
    { id: 4, name: 'Approximately', addresses: this._billingAddresses, email: 'qwerty4@gmail.com',
      status: CustomerStatuses.Inactive, type: CustomerTypes.Shipper, taxId: '1', mc: '456887' },
    { id: 5, name: 'Satisfying company', addresses: this._addresses, email: 'qwerty5@gmail.com',
      status: CustomerStatuses.Active, type: CustomerTypes.Broker, taxId: '1', mc: '123452' }];

  constructor(private http: Http) {
    this.http = http;
  }

  get(id: number): Observable<Customer> {
    return Observable.of(
      this._customersData.find((customer) => id === customer.id)
    );
  }

  create(customer: Customer) {
    this._customersData.push(customer);
  }

  search(query: string): Observable<Customer[]> {
    let queryRegex = new RegExp(query, 'ig');
    return Observable.of(
      this._customersData.filter((customer: Customer) => {
        return queryRegex.test(customer.name);
      }));
  }
}
