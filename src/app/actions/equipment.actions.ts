import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Equipment } from '../models';
import { EquipmentService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class EquipmentActions implements IListDataActions<Equipment>, IDetailDataActions<Equipment> {
  static ADD_EQUIPMENT: string = 'ADD_EQUIPMENT';
  static REMOVE_EQUIPMENT: string = 'REMOVE_EQUIPMENT';
  static UPDATE_EQUIPMENT: string = 'UPDATE_EQUIPMENT';
  static SELECT_EQUIPMENT: string = 'SELECT_EQUIPMENT';
  static CREATE_NEW_EQUIPMENT: string = 'CREATE_NEW_EQUIPMENT';
  static GET_ALL_EQUIPMENT: string = 'GET_ALL_EQUIPMENT';
  constructor (
    private equipmentService: EquipmentService,
    private ngRedux: NgRedux<IAppState>) {}

  add(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.ADD_EQUIPMENT, equipment });
  }

  remove(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.REMOVE_EQUIPMENT, equipment });
  }

  update(equipment: Equipment): void {
    this.ngRedux.dispatch({ type: EquipmentActions.UPDATE_EQUIPMENT, equipment });
  }

  select(equipmentId: number): void {
    this.equipmentService.getDetails(equipmentId).subscribe(equipment => {
      this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, equipment });
    });

  }

  createNew(): void {
    this.ngRedux.dispatch({ type: EquipmentActions.SELECT_EQUIPMENT, customer: Equipment.create() });
  }

  getAll(): void {
    this.equipmentService.getAll().subscribe(equipments => {
      this.ngRedux.dispatch({ type: EquipmentActions.GET_ALL_EQUIPMENT, items: equipments });
    });
  }
}
