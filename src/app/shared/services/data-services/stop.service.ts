import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Stop, Load } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { getPaginated } from '../../helpers';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

@Injectable()
export class StopService {

  constructor(private http: Http) {
    this.http = http;
  }

  getDetails(id: string): Observable<Stop> {
    const details = cloneDeep(MockData.stops.find((stop) => id === stop.id));
    return details ?  Observable.of(details) : Observable.throw('error');
  }

  remove(stop: Stop, load: Load): Observable<string> {
    if (stop && Load) {
      MockData.stops = MockData.stops.filter(s => s.id !== stop.id);
      MockData.loads.forEach(l => {
        if (l.id === load.id) {
          l.stops = l.stops.filter(s => s.id !== stop.id);
        }
      });
    }

    return Observable.of(stop.id);
  }

  update(stop: Stop) {
    const persistCompany = cloneDeep(stop);
    MockData.stops.forEach(c => {
      Object.assign(c, persistCompany);
    });
  }

  create(stop: Stop, load: Load): Observable<string> {
    const persistStop: Stop = cloneDeep(stop);
    persistStop.id = generatePersistId();
    if (stop) {
      MockData.stops.push(persistStop);
      MockData.loads.forEach(l => {
        if (l.id === load.id) {
          l.stops.push(persistStop);
        }
      });
    }
    return Observable.of(persistStop.id);
  }
}
