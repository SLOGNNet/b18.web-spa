import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Driver } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';

@Injectable()
export class DriverService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<Driver[]> {
    return Observable.of(
      MockData.drivers
    );
  }

  getDetails(id: number): Observable<Driver> {
    const result = MockData.drivers.find((driver) => id === driver.id);
    return Observable.of(result);
  }

  create(driver: Driver): Observable<number>  {
    MockData.drivers.push(driver);
    return Observable.of(generatePersistId());
   }

  update(driver: Driver) {
    const id = driver.id;

    MockData.drivers.forEach(d => {
      if (id === d.id) {
        d = Object.assign(d, driver);
      }
    });
  }
}
