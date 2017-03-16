import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Contact } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';

@Injectable()
export class ContactService {

  constructor(private http: Http) {
    this.http = http;
  }

    getContacts(): Observable<Contact[]> {
      return Observable.of(
        MockData.contacts
      );
    }
}
