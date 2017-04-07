import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Equipment } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

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

  create(equipment: Equipment): Observable<string> {
    const persistEquipment = cloneDeep(equipment);
    persistEquipment.id = generatePersistId();
    MockData.equipments.push(persistEquipment);
    return Observable.of(persistEquipment.id);
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
