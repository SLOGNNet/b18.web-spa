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
    return Observable.of(
      MockData.locations.find((location) => id === location.id)
    );
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
}
