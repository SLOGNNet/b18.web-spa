import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { Driver, DriverPaymentOptions } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { plainToClass, classToPlain } from 'class-transformer';
@Injectable()
export class DriverService {

  constructor(@Inject('AppConfig') private config, private http: HttpService) {
    this.http = http;
  }

  getAll(): Observable<any[]> {
    return this.http.get(this.getEquipmentUrl(''))
      .map(this.http.extractData)
      .map(json => {
        const result = plainToClass(Driver, json.values);
        return result;
      });
  }

  getDetails(id: string): Observable<Driver> {
     return this.http.get(this.getEquipmentUrl(id.toString()))
      .map(this.http.extractData)
      .map(json => {
        const result = plainToClass<Driver, Object>(Driver, json);
        return result;
      });
  }

  create(driver: Driver): Observable<any> {
     return this.http
      .post(this.getEquipmentUrl(''), classToPlain(driver))
      .map(this.http.extractData)
      .map(dr => dr.id);
   }

  update(driver: Driver) {
     return this.http
      .put(this.getEquipmentUrl(driver.id), classToPlain(driver));
  }

  getEquipmentUrl(entityUrl: String) {
    return this.config.apiUrl + 'drivers' + ( entityUrl ? '/' + entityUrl : '' );
  }
}
