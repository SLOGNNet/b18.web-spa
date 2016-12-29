import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {
  Load, Customer, LoadStatuses,
  DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, Commodity,
  LoadType, FreightType, DataAssigneeRequirements } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CustomerService } from  './index';
import MockData from './mock-data';

@Injectable()
export class LoadService {

  constructor(private http: Http, private customerService: CustomerService) {

  }

  getAll(): Observable<Load[]> {
    return Observable.from(MockData.loads)
      .flatMap(
        (load) => this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
    ).toArray();
  }

  getDetails(loadId: number): Observable<Load> {
    return Observable.of(MockData.loads.find((load) => load.id === loadId))
      .flatMap((load) =>
        this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
      );
  };

  create(load: Load) {
    MockData.loads.push(load);
  }

  update(load: Load) {
    const id = load.id;

    MockData.loads.forEach(l => {
      if (id === l.id) {
        Object.assign(l, load);
        return;
      }
    });
  }
}
