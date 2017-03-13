import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Driver, Notification } from '../models';
import { DriverService, NotificationService } from '../shared';
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
  static SELECT_DRIVER: string = 'SELECT_DRIVER';
  static CREATE_NEW_DRIVER: string = 'CREATE_NEW_DRIVER';
  static GET_ALL_DRIVERS: string = 'GET_ALL_DRIVERS';
  constructor(
    private driverService: DriverService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  add(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_REQUEST });
    this.driverService.create(driver).delay(3000).subscribe((newId) => {
      const prevId = driver.id;
      driver.id = newId;
      this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER_SUCCESS, driver, prevId });
      this.notificatonService.sendNotification('Driver created.', `${driver.firstName} ${driver.lastName} was created.`);
    });
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
    debugger;
    this.driverService.getAll().subscribe(drivers => {
      this.ngRedux.dispatch({ type: DriverActions.GET_ALL_DRIVERS, items: drivers });
    });
  }

  private getSelectedDriver() {
    const { selected } = this.ngRedux.getState().drivers;
    return selected;
  }

}
