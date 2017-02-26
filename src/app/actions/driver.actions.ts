import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Driver } from '../models';
import { DriverService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class DriverActions implements IListDataActions<Driver>, IDetailDataActions<Driver> {
  static ADD_DRIVER: string = 'ADD_DRIVER';
  static REMOVE_DRIVER: string = 'REMOVE_DRIVER';
  static UPDATE_DRIVER: string = 'UPDATE_DRIVER';
  static SELECT_DRIVER: string = 'SELECT_DRIVER';
  static CREATE_NEW_DRIVER: string = 'CREATE_NEW_DRIVER';
  static GET_ALL_DRIVERS: string = 'GET_ALL_DRIVERS';
  constructor (
    private driverService: DriverService,
    private ngRedux: NgRedux<IAppState>) {}

  add(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.ADD_DRIVER, driver });
  }

  remove(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.REMOVE_DRIVER, driver });
  }

  update(driver: Driver): void {
    this.ngRedux.dispatch({ type: DriverActions.UPDATE_DRIVER, driver });
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
}
