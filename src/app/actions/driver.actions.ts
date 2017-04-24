import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Driver, driverSchema, driverListSchema } from '../models';
import { DriverService, NotificationService, GoogleService } from '../shared';
import { IListDataActions, IDetailDataActions, IRootEditDataActions } from './intefaces';
import { plainToClass } from 'class-transformer';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class DriverActions implements IListDataActions<Driver>, IDetailDataActions<Driver>, IRootEditDataActions<Driver> {
  static ADD_DRIVER_REQUEST: string = 'ADD_DRIVER_REQUEST';
  static ADD_DRIVER_SUCCESS: string = 'ADD_DRIVER_SUCCESS';
  static ADD_DRIVER_FAILURE: string = 'ADD_DRIVER_FAILURE';
  static REMOVE_DRIVER: string = 'REMOVE_DRIVER';
  static UPDATE_DRIVER_REQUEST: string = 'UPDATE_DRIVER_REQUEST';
  static UPDATE_DRIVER_SUCCESS: string = 'UPDATE_DRIVER_SUCCESS';
  static UPDATE_DRIVER_FAILURE: string = 'UPDATE_DRIVER_FAILURE';
  static SELECT_DRIVER: string = 'SELECT_DRIVER';
  static CREATE_NEW_DRIVER: string = 'CREATE_NEW_DRIVER';
  static GET_ALL_DRIVERS: string = 'GET_ALL_DRIVERS';
  constructor(
    private _googleService: GoogleService,
    private driverService: DriverService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  add(driver: Driver): void {
    driver = plainToClass(Driver, driver);
    const normalizedPhantomData = normalize(driver, driverSchema);
    this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_REQUEST, data: normalizedPhantomData });

    this.driverService.create(driver).delay(3000).subscribe((newId) => {
      const prevId = driver.id;
      const normalizedData = normalize(createPeristEnity(driver, newId), driverSchema);
      this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_SUCCESS, data: normalizedData, prevId });
      this.notificatonService.sendNotification('Driver created.', `${driver.firstName} ${driver.lastName} was created.`);
    });
  }

  remove(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.REMOVE_DRIVER, driver });
  }

  update(driver: Driver): void {
    driver = plainToClass(Driver, driver);
    const normalizedData = normalize(driver, driverSchema);
    this.ngRedux.dispatch({ type: DriverActions.UPDATE_DRIVER_REQUEST, data: normalizedData});

    this.driverService.update(driver).subscribe(() => {
      this.ngRedux.dispatch({ type: DriverActions.UPDATE_DRIVER_SUCCESS, data: normalizedData });
      this.notificatonService.sendNotification('Driver updated.', `${driver.firstName} ${driver.lastName} was updated.`);
    });
  }

  select(driverId: string): void {
    this.driverService.getDetails(driverId).subscribe(driver => {
      const normalizedData = normalize(driver, driverSchema);
      this.ngRedux.dispatch({ type: DriverActions.SELECT_DRIVER, data: normalizedData });
    });
  }

  createNew(): void {
    const normalizedData = normalize(Driver.create(), driverSchema);
    this.ngRedux.dispatch({ type: DriverActions.SELECT_DRIVER, data: normalizedData });
  }

  getAll(): void {
    this.driverService.getAll().subscribe(drivers => {
      const normalizedData = normalize(drivers, driverListSchema);
      this.ngRedux.dispatch({ type: DriverActions.GET_ALL_DRIVERS, data: normalizedData });
    });
  }
}
