import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Load, Customer, LoadStatuses } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CustomerService } from  './index';

@Injectable()
export class LoadService {

  private _loadsData: Array<Load> = [
    { id: 1, customerId: 1, customer: null, status: LoadStatuses.Booked },
    { id: 2, customerId: 2, customer: null, status: LoadStatuses.Booked },
    { id: 3, customerId: 3, customer: null, status: LoadStatuses.Booked },
  ];

  constructor(private http: Http, private customerService: CustomerService) {

  }

  getAll(): Observable<Load[]> {
    return Observable.from(this._loadsData)
      .flatMap(
        (load) => this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
    ).toArray();
  }

  getDetails(loadId: number): Observable<Load> {
    return Observable.of(this._loadsData.find((load) => load.id === loadId))
      .flatMap((load) =>
        this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
      );
  };
}
