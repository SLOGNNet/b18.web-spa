import { Injectable, Inject } from '@angular/core';
import { Load } from './models';
import { Observable } from 'rxjs/Observable';
import { CompanyService } from './index';
import MockData from './mock-data';
import { HttpService } from '../http.service';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';
@Injectable()
export class LoadService {

  constructor(private http: HttpService, private companyService: CompanyService, @Inject('AppConfig') private config) {
    console.log(this.http.get(config.apiUrl + 'load/1/card'));
  }

  getAll(): Observable<Load[]> {
    return Observable.from(cloneDeep(MockData.loads))
      .flatMap(
      (load) => {
        if (load.companyId) {
          return this.companyService
            .getDetails(load.companyId)
            .map(customer => Object.assign(load, { customer }));
        } else {
          return Observable.of(load);
        }
      }
      ).toArray();
  };

  getDetails(loadId: string): Observable<Load> {
    return Observable.of(MockData.loads.find((load) => load.id === loadId))
      .flatMap((load) => {
        if (!load) return Observable.of(null);

        if (load.companyId) {
          return this.companyService
            .getDetails(load.companyId)
            .map(customer => Object.assign(load, { customer }));
        } else {
          return Observable.of(load);
        }
      }
      );
  };

  create(load: Load): Observable<string> {
    const persistLoad = cloneDeep(load);
    persistLoad.id = generatePersistId();
    persistLoad.systemLoadNo = this.generateSystemLoadNumber();
    MockData.loads.push(persistLoad);
    return Observable.of(persistLoad.id);
  }

  update(load: Load): Observable<string> {
    const persistLoad = cloneDeep(load);
    const id = persistLoad.id;

    MockData.loads.forEach(l => {
      if (id === l.id) {
        Object.assign(l, persistLoad);
        return;
      }
    });

    return Observable.of(id);
  }

  private generateSystemLoadNumber(): string {
    const systemNumber = new Date().getTime().toString();
    return systemNumber.slice(0, 7);
  }
}
