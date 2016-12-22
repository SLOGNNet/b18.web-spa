import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Contacts, Address } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class ContactService {

private _contacts: Array<Contacts> = [
  { id: 1, name: 'John', phone: '1234567', email: 'qwerty@gmail.com', position: 'CEO'},
  { id: 2, name: 'Mike', phone: '1234567', email: 'qwerty@gmail.com', position: 'CEO'}];

  constructor(private http: Http) {
    this.http = http;
  }

    getContacts(): Observable<Contacts[]> {
      return Observable.of(
        this._contacts
      );
    }
}
