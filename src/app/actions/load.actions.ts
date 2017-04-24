import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Load, loadSchema, loadListSchema } from '../models';
import { IListDataActions, IDetailDataActions, IRootEditDataActions } from './intefaces';
import { LoadService, NotificationService } from '../shared';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class LoadActions implements IListDataActions<Load>, IDetailDataActions<Load>, IRootEditDataActions<Load> {
  static ADD_LOAD_REQUEST: string = 'ADD_LOAD_REQUEST';
  static ADD_LOAD_SUCCESS: string = 'ADD_LOAD_SUCCESS';
  static ADD_LOAD_FAILURE: string = 'ADD_LOAD_FAILURE';
  static REMOVE_LOAD: string = 'REMOVE_LOAD';
  static UPDATE_LOAD_REQUEST: string = 'UPDATE_LOAD_REQUEST';
  static UPDATE_LOAD_SUCCESS: string = 'UPDATE_LOAD_SUCCESS';
  static UPDATE_LOAD_FAILURE: string = 'UPDATE_LOAD_FAILURE';
  static SELECT_LOAD_SUCCESS: string = 'SELECT_LOAD_SUCCESS';
  static SELECT_LOAD_FAILURE: string = 'SELECT_LOAD_FAILURE';
  static CREATE_NEW_LOAD: string = 'CRETE_NEW_LOAD';
  static GET_ALL_LOADS: string = 'GET_ALL_LOADS';

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private notificatonService: NotificationService,
    private loadService: LoadService) {}

  add(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.ADD_LOAD_REQUEST, load });
    this.loadService.create(load).delay(2000).subscribe((newId) => {
      const prevId = load.id;
      const normalizedData = normalize(createPeristEnity(load, newId), loadSchema);
      this.ngRedux.dispatch({ type: LoadActions.ADD_LOAD_SUCCESS, data: normalizedData, prevId });
      this.notificatonService.sendNotification('Load created.', `${load.systemLoadNo} was created.`);
    });
  }

  remove(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.REMOVE_LOAD, load  });
  }

  update(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.UPDATE_LOAD_REQUEST});
      this.loadService.update(load).delay(2000).subscribe(() => {
        const normalizedData = normalize(load, loadSchema);
        this.ngRedux.dispatch({ type: LoadActions.UPDATE_LOAD_SUCCESS, data: normalizedData });
        this.notificatonService.sendNotification('Load updated.', `${load.systemLoadNo} was updated.`);
      });
  }

  select(loadId: string): void {
    this.loadService.getDetails(loadId).subscribe(load => {
      if (load) {
        const normalizedData = normalize(load, loadSchema);
        this.ngRedux.dispatch({ type: LoadActions.SELECT_LOAD_SUCCESS, data: normalizedData });
      } else {
        this.ngRedux.dispatch({ type: LoadActions.SELECT_LOAD_FAILURE });
      }
    });
  }

  createNew(): void {
    const normalizedData = normalize(Load.create(), loadSchema);
    this.ngRedux.dispatch({ type: LoadActions.SELECT_LOAD_SUCCESS, data: normalizedData });
  }

  getAll(): void {
    this.loadService.getAll().subscribe(loads => {
      const normalizedData = normalize(loads, loadListSchema);
      this.ngRedux.dispatch({ type: LoadActions.GET_ALL_LOADS, data: normalizedData });
    });
  }
}
