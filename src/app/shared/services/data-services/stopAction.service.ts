import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Stop, StopAction } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { getPaginated } from '../../helpers';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

@Injectable()
export class StopActionService {

  constructor(private http: Http) {
    this.http = http;
  }

  remove(stopAction: StopAction, stop: Stop): Observable<string> {
    if (stop && stopAction) {
      MockData.stopActionCollection = MockData.stopActionCollection.filter(s => s.id !== stopAction.id);
      MockData.stops.forEach(s => {
        if (s.id === stop.id) {
          s.stopActions = s.stopActions.filter(sa => sa.id !== stopAction.id);
        }
      });
    }

    return Observable.of(stop.id);
  }

  update(stopAction: StopAction) {
    const persistCompany = cloneDeep(stopAction);
    MockData.stopActionCollection.forEach(sa => {
      if (stopAction.id === sa.id) {
        Object.assign(sa, persistCompany);
      }
    });
  }

  create(stopAction: StopAction, stop: Stop): Observable<string> {
    const persistStopAction: StopAction = cloneDeep(stopAction);
    persistStopAction.id = generatePersistId();
    if (stop) {
      MockData.stopActionCollection.push(persistStopAction);
      MockData.stops.forEach(s => {
        if (s.id === stop.id) {
          s.stopActions.push(persistStopAction);
        }
      });
    }
    return Observable.of(persistStopAction.id);
  }
}
