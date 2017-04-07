import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Equipment, equipmentSchema, equipmentListSchema } from '../models';
import { EquipmentService, NotificationService } from '../shared';
import { IListDataActions, IDetailDataActions, IRootEditDataActions } from './intefaces';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class EquipmentActions implements IListDataActions<Equipment>, IDetailDataActions<Equipment>, IRootEditDataActions<Equipment> {
  static ADD_EQUIPMENT_REQUEST: string = 'ADD_EQUIPMENT_REQUEST';
  static ADD_EQUIPMENT_SUCCESS: string = 'ADD_EQUIPMENT_SUCCESS';
  static REMOVE_EQUIPMENT: string = 'REMOVE_EQUIPMENT';
  static UPDATE_EQUIPMENT_REQUEST: string = 'UPDATE_EQUIPMENT_REQUEST';
  static UPDATE_EQUIPMENT_SUCCESS: string = 'UPDATE_EQUIPMENT_SUCCESS';
  static UPDATE_EQUIPMENT_FAILURE: string = 'UPDATE_EQUIPMENT_FAILURE';
  static SELECT_EQUIPMENT: string = 'SELECT_EQUIPMENT';
  static CREATE_NEW_EQUIPMENT: string = 'CREATE_NEW_EQUIPMENT';
  static GET_ALL_EQUIPMENTS: string = 'GET_ALL_EQUIPMENTS';
  constructor (
    private equipmentService: EquipmentService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) {}

  add(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.ADD_EQUIPMENT_REQUEST, equipment });
    this.equipmentService.create(equipment).delay(2000).subscribe((newId) => {
      const prevId = equipment.id;
      const normalizedData = normalize(createPeristEnity(equipment, newId), equipmentSchema);
      this.ngRedux.dispatch({ type: EquipmentActions.ADD_EQUIPMENT_SUCCESS, data: normalizedData, prevId });
      this.notificatonService.sendNotification('Equipment created.', `${equipment.number} was created.`);
    });
  }

  remove(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.REMOVE_EQUIPMENT, equipment });
  }

  update(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.UPDATE_EQUIPMENT_REQUEST});
      this.equipmentService.update(equipment).delay(2000).subscribe(() => {
        const normalizedData = normalize(equipment, equipmentSchema);
        this.ngRedux.dispatch({ type: EquipmentActions.UPDATE_EQUIPMENT_SUCCESS, data: normalizedData });
        this.notificatonService.sendNotification('Driver updated.', `${equipment.make} was updated.`);
      });
  }

  select(equipmentId: string): void {
    this.equipmentService.getDetails(equipmentId).subscribe(equipment => {
      const normalizedData = normalize(equipment, equipmentSchema);
      this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, data: normalizedData });
    });

  }

  createNew(): void {
    const normalizedData = normalize(Equipment.create(), equipmentSchema);
    this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, data: normalizedData });
  }

  getAll(): void {
    this.equipmentService.getAll().subscribe(equipments => {
      const normalizedData = normalize(equipments, equipmentListSchema);
      this.ngRedux.dispatch({ type: EquipmentActions.GET_ALL_EQUIPMENTS, data: normalizedData });
    });
  }
}
