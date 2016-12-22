import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Commodity } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';

@Injectable()
export class CommodityService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<any> {
    return Observable.create((observer: any) => {
      observer.next(MockData.commodities);
    });
  }
}
