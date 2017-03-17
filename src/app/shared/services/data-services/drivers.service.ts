import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { Driver } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';
import { Type } from 'class-transformer';
@Injectable()
export class DriverService {

  constructor(@Inject('AppConfig') private config, private http: HttpService) {
    this.http = http;
  }

  getAll(): Observable<any[]> {
    return this.http.get(this.getEquipmentUrl('')).map(list => {
      return list.json().values;
    });
  }

  getDetails(id: number): Observable<Driver> {
       const result = MockData.drivers.find((driver) => id === driver.id);
    return Observable.of(result);
  }

  create(driver: Driver): Observable<any> {
     return this.http
      .post(this.getEquipmentUrl(''), driver)
      .map(this.http.extractData)
      .map(dr => dr.id);
   }

  update(driver: Driver) {
    return this.http
      .put(this.getEquipmentUrl(''), driver);
  }

  getEquipmentUrl(entityUrl: String) {
    return this.config.apiUrl + 'drivers' + ( entityUrl ? '/' + entityUrl : '' );
  }
}
