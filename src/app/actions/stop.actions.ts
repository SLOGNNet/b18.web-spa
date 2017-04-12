import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Stop, Load, stopSchema } from '../models';
import { StopService, NotificationService } from '../shared';
import { IDetailDataActions, INestedEditDataActions } from './intefaces';
import { LoadActions } from './load.actions';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class StopActions implements IDetailDataActions<Stop>, INestedEditDataActions<Stop, Load> {
  static ADD_STOP_LOAD_REQUEST: string = 'ADD_STOP_LOAD_REQUEST';
  static ADD_STOP_LOAD_SUCCESS: string = 'ADD_STOP_LOAD_SUCCESS';
  static UPDATE_STOP_LOAD_REQUEST: string = 'UPDATE_STOP_LOAD_REQUEST';
  static UPDATE_STOP_LOAD_SUCCESS: string = 'UPDATE_STOP_LOAD_SUCCESS';
  static UPDATE_STOP_LOAD_FAILURE: string = 'UPDATE_STOP_LOAD_FAILURE';
  static REMOVE_STOP_LOAD_SUCCESS: string = 'REMOVE_STOP_LOAD_SUCCESS';
  static SELECT_STOP_LOAD: string = 'SELECT_STOP_LOAD';
  constructor(
    private stopService: StopService,
    private loadActions: LoadActions,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  addAssociation(stop: Stop, load: Load): void {
    this.ngRedux.dispatch({ type: StopActions.ADD_STOP_LOAD_REQUEST });
    this.stopService.create(stop, load).subscribe(newId => {
      const prevId = stop.id;
      const normalizedData = normalize(createPeristEnity(stop, newId), stopSchema);
      this.ngRedux.dispatch({ type: StopActions.ADD_STOP_LOAD_SUCCESS, data: normalizedData, prevId, loadId: load.id});
      this.notificatonService.sendNotification('Stop created.', `Stop was created.`);
    });
  }

  updateAssociation(stop: Stop, load: Load): void {
    this.ngRedux.dispatch({ type: StopActions.UPDATE_STOP_LOAD_REQUEST, stop });

    setTimeout(() => {
      this.stopService.update(stop);
      const normalizedData = normalize(stop, stopSchema);
      this.ngRedux.dispatch({ type: StopActions.UPDATE_STOP_LOAD_SUCCESS, data: normalizedData });
      this.notificatonService.sendNotification('Stop updated.', `Stop was updated.`);
    }, 3000);
  }

  removeAssociation(stop: Stop, load: Load): void {
    const normalizedData = normalize(stop, stopSchema);
    this.ngRedux.dispatch({ type: StopActions.REMOVE_STOP_LOAD_SUCCESS, data: normalizedData, loadId: load.id });
  }

  select(stopId: string): void {
    this.stopService.getDetails(stopId).subscribe(contact => {
      const normalizedData = normalize(contact, stopSchema);
      this.ngRedux.dispatch({ type: StopActions.SELECT_STOP_LOAD, data: normalizedData  });
    }, (error) => {});
  }

  createNew(): void {
    const normalizedData = normalize(Stop.create(), stopSchema);
    this.ngRedux.dispatch({ type: StopActions.SELECT_STOP_LOAD, data: normalizedData  });
  }
}
