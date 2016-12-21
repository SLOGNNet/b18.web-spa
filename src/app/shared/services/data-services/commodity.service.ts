import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Commodity } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';

@Injectable()
export class CommodityService {

  private commodities: Array<Commodity> = [{
    pickupNumber: 1,
    po: '23324234',
    commodity: 'Strawberry',
    unitType: 'Boxes',
    unitCount: 22,
    palletCount: 10,
    weight: 14,
  },
  {
    pickupNumber: 2,
    po: '789',
    commodity: 'Toma',
    unitType: 'Boxes',
    unitCount: 10,
    palletCount: 10,
    weight: 5
  }];

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<any> {
    return Observable.create((observer: any) => {
      observer.next(this.commodities);
    });
  }
}
