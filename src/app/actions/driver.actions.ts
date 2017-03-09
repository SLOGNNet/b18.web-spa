import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Driver, Notification, Address } from '../models';
import { DriverService, NotificationService, GoogleService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class DriverActions implements IListDataActions<Driver>, IDetailDataActions<Driver> {
  static ADD_DRIVER_REQUEST: string = 'ADD_DRIVER_REQUEST';
  static ADD_DRIVER_SUCCESS: string = 'ADD_DRIVER_SUCCESS';
  static ADD_DRIVER_FAILURE: string = 'ADD_DRIVER_FAILURE';
  static REMOVE_DRIVER: string = 'REMOVE_DRIVER';
  static UPDATE_DRIVER_REQUEST: string = 'UPDATE_DRIVER_REQUEST';
  static UPDATE_DRIVER_SUCCESS: string = 'UPDATE_DRIVER_SUCCESS';
  static UPDATE_DRIVER_FAILURE: string = 'UPDATE_DRIVER_FAILURE';
  static UPDATE_SELECTED_DRIVER_ADDRESS: string = 'UPDATE_DRIVER_ADDRESS';
  static SELECT_DRIVER: string = 'SELECT_DRIVER';
  static CREATE_NEW_DRIVER: string = 'CREATE_NEW_DRIVER';
  static GET_ALL_DRIVERS: string = 'GET_ALL_DRIVERS';
  constructor(
    private _googleService: GoogleService,
    private driverService: DriverService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  add(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_REQUEST, driver });

    setTimeout(() => {
      this.driverService.create(driver);
      this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_SUCCESS, driver });
      this.notificatonService.sendNotification('Driver created.', `${driver.firstName} ${driver.lastName} was created.`);
    }, 3000);
  }

  remove(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.REMOVE_DRIVER, driver });
  }

  update(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.UPDATE_DRIVER_REQUEST, driver });

    setTimeout(() => {
      this.driverService.update(driver);
      this.ngRedux.dispatch({ type: DriverActions.UPDATE_DRIVER_SUCCESS, driver });
      this.notificatonService.sendNotification('Driver updated.', `${driver.firstName} ${driver.lastName} was updated.`);
    }, 3000);
  }

  select(driverId: number): void {
    this.driverService.getDetails(driverId).subscribe(driver => {
      this.ngRedux.dispatch({ type: DriverActions.SELECT_DRIVER, driver });
    });
  }

  createNew(): void {
    this.ngRedux.dispatch({ type: DriverActions.SELECT_DRIVER, driver: Driver.create() });
  }

  getAll(): void {
    this.driverService.getAll().subscribe(drivers => {
      this.ngRedux.dispatch({ type: DriverActions.GET_ALL_DRIVERS, items: drivers });
    });
  }

  updateAddress(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.UPDATE_SELECTED_DRIVER_ADDRESS, driver });
  }

  updatePlace(driver: Driver, placeId: string): void {
    this._googleService.getDetails(placeId)
      .subscribe(detail => {
        driver.address = Object.assign(driver.address, detail);
        this.updateAddress(driver);
      });
  }

}
