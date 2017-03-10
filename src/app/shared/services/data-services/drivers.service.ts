import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Driver, Contact, Equipment, DriverTypes, DriverStatuses, DriverPaymentTypes } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';
import { plainToClass, classToPlain } from 'class-transformer';

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

  create(driver: Driver) {
    MockData.drivers.push(driver);
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
