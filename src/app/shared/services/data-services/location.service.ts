import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company, Location } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

@Injectable()
export class LocationService {

  constructor(private http: Http) {
    this.http = http;
  }

  getDetails(id: string): Observable<Location> {
    const details = cloneDeep(MockData.locations.find((location) => id === location.id));
    return details ?  Observable.of(details) : Observable.throw('error');
  }

  update(location: Location) {
    const id = location.id;

    MockData.locations.forEach(c => {
      if (id === c.id) {
        c = Object.assign(c, location);
      }
    });
  }

  create(company: Company, location: Location): Observable<string> {
    const persitLocation: Location = cloneDeep(location);
    persitLocation.id = generatePersistId();
    if (company) {
      MockData.locations.push(location);
      MockData.companies.forEach(c => {
        if (c.id === company.id) {
          c.locations.push(persitLocation);
        }
      });
    }

    return Observable.of(persitLocation.id);
  }

  remove(company: Company, location: Location): Observable<string> {
    if (company && location) {
      MockData.locations = MockData.locations.filter(l => l.id !== location.id);
      MockData.companies.forEach(c => {
        if (c.id === company.id) {
          c.locations = c.locations.filter(l => l.id !== location.id);
        }
      });
    }

    return Observable.of(location.id);
  }
}
