import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Equipment } from '../models';
import { EquipmentService, NotificationService } from '../shared';
import { IListDataActions, IDetailDataActions, IRootEditDataActions } from './intefaces';
import { plainToClass } from 'class-transformer';
import { cloneDeep } from 'lodash';

@Injectable()
export class EquipmentActions implements IListDataActions<Equipment>, IDetailDataActions<Equipment>, IRootEditDataActions<Equipment> {
  static ADD_EQUIPMENT_REQUEST: string = 'ADD_EQUIPMENT_REQUEST';
  static ADD_EQUIPMENT_SUCCESS: string = 'ADD_EQUIPMENT_SUCCESS';
  static REMOVE_EQUIPMENT: string = 'REMOVE_EQUIPMENT';
  static UPDATE_EQUIPMENT: string = 'UPDATE_EQUIPMENT';
  static SELECT_EQUIPMENT: string = 'SELECT_EQUIPMENT';
  static CREATE_NEW_EQUIPMENT: string = 'CREATE_NEW_EQUIPMENT';
  static GET_ALL_EQUIPMENT: string = 'GET_ALL_EQUIPMENT';
  constructor (
    private equipmentService: EquipmentService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) {}

  add(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.ADD_EQUIPMENT_REQUEST, equipment });
    this.equipmentService.create(equipment).subscribe((newId) => {
      this.ngRedux.dispatch({ type: EquipmentActions.ADD_EQUIPMENT_SUCCESS, equipment: cloneDeep(equipment), newId });
      this.notificatonService.sendNotification('Equipment created.', `${equipment.number} was created.`);
    });
  }

  remove(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.REMOVE_EQUIPMENT, equipment });
  }

  update(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.UPDATE_EQUIPMENT, equipment });
  }

  select(equipmentId: string): void {
    this.equipmentService.getDetails(equipmentId).subscribe(equipment => {
      this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, equipment });
    });

  }

  createNew(): void {
    this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, equipment: Equipment.create() });
  }

  getAll(): void {
    this.equipmentService.getAll().subscribe(equipments => {
      this.ngRedux.dispatch({ type: EquipmentActions.GET_ALL_EQUIPMENT, items: equipments });
    });
  }
}
