import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company, Contact } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

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

  create(company: Company, contact: Contact): Observable<string> {
    const persistContact: Contact = cloneDeep(contact);
    persistContact.id = generatePersistId();
    if (company) {
      MockData.companies.forEach(c => {
        if (c.id === company.id) {
          c.contacts.push(persistContact);
        }
      });
    }

    return Observable.of(persistContact.id);
  }
}
