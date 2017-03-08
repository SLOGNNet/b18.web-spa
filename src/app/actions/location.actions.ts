import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Location, Address } from '../models';
import { GoogleService } from '../shared';

@Injectable()
export class LocationActions {
  static ADD_LOCATION: string = 'ADD_ADDRES';
  static REMOVE_LOCATION: string = 'REMOVE_LOCATION';
  static UPDATE_LOCATION: string = 'UPDATE_LOCATION';
  static UPDATE_LOCATION_ADDRESS: string = 'UPDATE_LOCATION_ADDRESS';

  constructor (
    private _googleService: GoogleService,
    private ngRedux: NgRedux<IAppState>) {}

  add(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.ADD_LOCATION, location });
  }

  remove(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.REMOVE_LOCATION, location });
  }

  update(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.UPDATE_LOCATION, location });
  }

  updateAddress(address: Address): void {
    this.ngRedux.dispatch({ type: LocationActions.UPDATE_LOCATION_ADDRESS, address });
  }

  updatePlace(addressId: number, placeId: string): void {
    this._googleService.getDetails(placeId)
      .subscribe(detail => {
        this.updateAddress(Object.assign(detail, { id: addressId}));
      });
  }
}
