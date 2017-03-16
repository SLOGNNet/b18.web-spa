import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
