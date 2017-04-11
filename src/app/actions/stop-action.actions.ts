import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { StopAction, stopActionSchema, Stop, Commodity } from '../models';
import { normalize } from 'normalizr';

@Injectable()
export class StopActionActions {
  static ADD_STOP_ACTION: string = 'ADD_STOP_ACTION';
  static REMOVE_STOP_ACTION: string = 'REMOVE_STOP_ACTION';
  static UPDATE_STOP_ACTION: string = 'UPDATE_STOP_ACTION';
  static ADD_STOP_ACTION_COMMODITY_SUCCESS = 'ADD_STOP_ACTION_COMMODITY_SUCCESS';
  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(stopAction: StopAction, stop: Stop): void {
    const normalizedData = normalize(stopAction, stopActionSchema);
    this.ngRedux.dispatch({ type: StopActionActions.ADD_STOP_ACTION, data: normalizedData, stopId: stop.id });
  }

  remove(stopAction: StopAction, stop: Stop): void {
    const normalizedData = normalize(stopAction, stopActionSchema);
    this.ngRedux.dispatch({ type: StopActionActions.REMOVE_STOP_ACTION, data: normalizedData, stopId: stop.id });
  }

  update(stopAction: StopAction): void {
    const normalizedData = normalize(stopAction, stopActionSchema);
    this.ngRedux.dispatch({ type: StopActionActions.UPDATE_STOP_ACTION, data: normalizedData });
  }

  addCommodity(commodity: Commodity, stopAction: StopAction): void {
    this.ngRedux.dispatch({ type: StopActionActions.ADD_STOP_ACTION_COMMODITY_SUCCESS, commodityId: commodity.id, stopActionId: stopAction.id });
  }
}
