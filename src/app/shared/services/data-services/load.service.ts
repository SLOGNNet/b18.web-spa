import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Load, Customer } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CustomerService } from  './index';

@Injectable()
export class LoadService {

  private _loadsData: Array<Load> = [
    { id: 1, customerId: 1, customer: null }];

  constructor(private http: Http, private customerService: CustomerService) {

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
