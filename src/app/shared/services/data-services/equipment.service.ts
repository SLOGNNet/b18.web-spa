import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Equipment, PowerUnitTypes, TrailerTypes, EquipmentTypes, EquipmentModes, EquipmentStatuses, EquipmentVehicleOperatings } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
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

  getDetails(id: number): Observable<Equipment> {
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
