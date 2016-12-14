import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Contacts } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class ContactService {

  constructor(private http: Http) {
    this.http = http;
  }

  private _contacts: Array<Contacts> = [
    { contact: 'John'},
    { contact: 'Mike'}];

    getContacts() : Observable<Contacts[]> {
      return Observable.of(
          this._contacts
      );
    }
}
