import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { Driver } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';
import { plainToClass } from 'class-transformer';
@Injectable()
export class DriverService {

  constructor(@Inject('AppConfig') private config, private http: HttpService) {
    this.http = http;
  }

  getAll(): Observable<any[]> {
    return this.http.get(this.getEquipmentUrl(''))
      .map(this.http.extractData)
      .map(json => plainToClass(Driver, json.values));
  }

  getDetails(id: string): Observable<Driver> {
     return this.http.get(this.getEquipmentUrl(id.toString()))
      .map(this.http.extractData)
      .map(driver => plainToClass<Driver, Object>(Driver, driver));
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
