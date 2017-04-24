import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Facility } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';

@Injectable()
export class FacilityService {

  constructor(private http: Http) {
    this.http = http;
  }

  search(query: string): Observable<Facility[]> {
    return Observable.of(this._search(query));
  }

  private _search(query: string) {
    let queryRegex = new RegExp(query, 'ig');
    return MockData.facilities.filter((facility: Facility) => {
        return queryRegex.test(facility.name);
    });
  }
}
