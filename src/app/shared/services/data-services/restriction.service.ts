import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';

@Injectable()
export class RestrictionService {
  getAll(): Observable<any> {
    return Observable.create((observer: any) => {
      observer.next(MockData.restrictions);
    });
  }
}