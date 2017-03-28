import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Stop } from '../models';

@Injectable()
export class StopActions {
  static ADD_STOP: string = 'ADD_STOP';
  static REMOVE_STOP: string = 'REMOVE_STOP';
  static UPDATE_STOP: string = 'UPDATE_STOP';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(stop: Stop): void {
    this.ngRedux.dispatch({ type: StopActions.ADD_STOP, stop });
  }

  remove(stop: Stop): void {
    this.ngRedux.dispatch({ type: StopActions.REMOVE_STOP, stop });
  }

  update(stop: Stop): void {
    this.ngRedux.dispatch({ type: StopActions.UPDATE_STOP, stop });
  }
}
