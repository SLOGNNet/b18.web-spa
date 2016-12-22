import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Contacts, Address } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class ContactService {

  private _addresses: Array<Address> = [{
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

private _contacts: Array<Contacts> = [
  { name: 'John', phone: '1234567', email: 'qwerty@gmail.com', position: 'CEO', address: this._addresses},
  { name: 'Mike', phone: '1234567', email: 'qwerty@gmail.com', position: 'CEO', address: this._addresses}];

  constructor(private http: Http) {
    this.http = http;
  }

    getContacts(): Observable<Contacts[]> {
      return Observable.of(
        this._contacts
      );
    }
}
