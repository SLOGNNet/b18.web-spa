import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {
  Load, Company, LoadStatuses,
  DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, Commodity,
  LoadType, FreightType
} from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CompanyService } from './index';
import MockData from './mock-data';
import { HttpService } from '../http.service';
import { TypedJSON } from 'typedjson-npm/src/typed-json';
import { plainToClass } from 'class-transformer';
@Injectable()
export class LoadService {

  constructor(private http: HttpService, private companyService: CompanyService, @Inject('AppConfig') private config) {
    console.log(this.http.get(config.apiUrl + 'load/1/card'));
  }

  getAll(): Observable<Load[]> {
    return Observable.from(MockData.loads)
      .flatMap(
      (load) => this.companyService
        .getDetails(load.companyId)
        .map(customer => Object.assign(load, { customer }))
      ).toArray();
  };

  getDetails(loadId: number): Observable<Load> {
    return Observable.of(MockData.loads.find((load) => load.id === loadId))
      .flatMap((load) =>
        this.companyService
          .getDetails(load.companyId)
          .map(customer => Object.assign(load, { customer }))
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
