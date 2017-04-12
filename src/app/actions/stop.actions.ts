import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Stop, stopSchema } from '../models';
import { normalize } from 'normalizr';

@Injectable()
export class StopActions {
  static ADD_STOP: string = 'ADD_STOP';
  static REMOVE_STOP: string = 'REMOVE_STOP';
  static UPDATE_STOP: string = 'UPDATE_STOP';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(stop: Stop): void {
    const normalizedData = normalize(stop, stopSchema);
    this.ngRedux.dispatch({ type: StopActions.ADD_STOP, data: normalizedData });
  }

  remove(stop: Stop): void {
    this.ngRedux.dispatch({ type: StopActions.REMOVE_STOP, stop });
  }

  update(stop: Stop): void {
    const normalizedData = normalize(stop, stopSchema);
    this.ngRedux.dispatch({ type: StopActions.UPDATE_STOP, data: normalizedData });
  }
}
