import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {
  Load, Company, LoadStatuses,
  DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, Commodity,
  LoadType, FreightType } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CompanyService } from  './index';
import MockData from './mock-data';

@Injectable()
export class LoadService {

  constructor(private http: Http, private companyService: CompanyService) {

  }

  getAll(): Observable<Load[]> {
    return Observable.from(MockData.loads)
      .flatMap(
        (load) => this.companyService
          .getDetails(load.companyId)
          .map(company => Object.assign(load, { company }))
    ).toArray();
  }

  getDetails(loadId: number): Observable<Load> {
    return Observable.of(MockData.loads.find((load) => load.id === loadId))
      .flatMap((load) =>
        this.companyService
          .getDetails(load.companyId)
          .map(company => Object.assign(load, { customer: company }))
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
