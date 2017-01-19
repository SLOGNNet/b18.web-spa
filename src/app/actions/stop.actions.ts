import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Stop } from '../models';

@Injectable()
export class StopActions {
  static ADD_STOP: string = 'ADD_ADDRES';
  static REMOVE_STOP: string = 'REMOVE_STOP';
  static UPDATE_STOP: string = 'UPDATE_STOP';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(stop: Stop): void {
    this.ngRedux.dispatch({ type: AddressActions.ADD_STOP, stop });
  }

  remove(stop: Stop): void {
    this.ngRedux.dispatch({ type: AddressActions.REMOVE_STOP, stop });
  }

  update(stop: Stop): void {
    this.ngRedux.dispatch({ type: AddressActions.UPDATE_STOP, stop });
  }
}
