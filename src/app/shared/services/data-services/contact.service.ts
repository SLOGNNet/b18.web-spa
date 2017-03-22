import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company, Contact } from './models';
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

  getDetails(id: string): Observable<Contact> {
    return Observable.of(
      MockData.contacts.find((contact) => id === contact.id)
    );
  }

  update(contact: Contact) {
    const id = contact.id;

    MockData.contacts.forEach(c => {
      if (id === c.id) {
        c = Object.assign(c, contact);
      }
    });
  }

  create(company: Company, contact: Contact) {
    MockData.companies.forEach(c => {
      if (c.id === company.id) {
        contact.id = new Date().getTime().toString();
        c.contacts.push(contact);
      }
    });
  }
}
