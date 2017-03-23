import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Location } from '../models';
import { GoogleService } from '../shared';

@Injectable()
export class LocationActions {
  static ADD_LOCATION: string = 'ADD_LOCATION';
  static REMOVE_LOCATION: string = 'REMOVE_LOCATION';
  static UPDATE_LOCATION: string = 'UPDATE_LOCATION';

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
}
