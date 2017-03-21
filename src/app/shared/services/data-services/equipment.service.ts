import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Equipment } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';

@Injectable()
export class EquipmentService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<Equipment[]> {
    return Observable.of(
      MockData.equipments
    );
  }

  getDetails(id: string): Observable<Equipment> {
    return Observable.of(
      MockData.equipments.find((equipment) => id === equipment.id)
    );
  }

  create(equipment: Equipment) {
    MockData.equipments.push(equipment);
  }

  update(equipment: Equipment) {
    const id = equipment.id;

    MockData.equipments.forEach(e => {
      if (id === e.id) {
        Object.assign(e, equipment);
        return;
      }
    });
  }
}
