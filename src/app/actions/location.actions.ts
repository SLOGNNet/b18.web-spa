import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Location, Address } from '../models';
import { GoogleService } from '../shared';

@Injectable()
export class LocationActions {
  static ADD_LOCATION: string = 'ADD_LOCATION';
  static REMOVE_LOCATION: string = 'REMOVE_LOCATION';
  static UPDATE_LOCATION: string = 'UPDATE_LOCATION';
  static UPDATE_SELECTED_LOCATION_ADDRESS: string = 'UPDATE_LOCATION_ADDRESS';

  constructor(
    private _googleService: GoogleService,
    private ngRedux: NgRedux<IAppState>) { }

  add(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.ADD_LOCATION, location });
  }

  remove(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.REMOVE_LOCATION, location });
  }

  update(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.UPDATE_LOCATION, location });
  }

  updateAddress(location: Location): void {
    this.ngRedux.dispatch({ type: LocationActions.UPDATE_SELECTED_LOCATION_ADDRESS, location });
  }

  updatePlace(location: Location, placeId: string): void {
    this._googleService.getDetails(placeId)
      .subscribe(detail => {
        location.address = Object.assign(location.address, detail);
        this.updateAddress(location);
      });
  }
}
