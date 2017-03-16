import { Component } from '@angular/core';
import { Driver } from '../models';
import { DriverActions } from '../actions';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent extends BaseListComponent<Driver> {
  constructor(
    driverActions: DriverActions,
    router: Router,
    route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>) {
    super(driverActions, ngRedux.select(state => state.drivers.items), router, route);
  }

  protected routePath(): string {
    return 'drivers/';
  }

  private trackBy(index: number, driver: Driver) {
    return driver.id;
  }
}
