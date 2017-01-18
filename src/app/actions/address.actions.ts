import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Address } from '../models';

@Injectable()
export class AddressActions {
  static ADD_ADDRESS: string = 'ADD_ADDRES';
  static REMOVE_ADDRESS: string = 'REMOVE_ADDRESS';
  static UPDATE_ADDRESS: string = 'UPDATE_ADDRESS';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(address: Address): void {
    this.ngRedux.dispatch({ type: AddressActions.ADD_ADDRESS, address });
  }

  remove(address: Address): void {
    this.ngRedux.dispatch({ type: AddressActions.REMOVE_ADDRESS, address });
  }

  update(address: Address): void {
    this.ngRedux.dispatch({ type: AddressActions.UPDATE_ADDRESS, address });
  }
}
