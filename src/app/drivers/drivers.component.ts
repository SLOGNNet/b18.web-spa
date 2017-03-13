import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Driver } from '../models';
import { DriverActions } from '../actions';
import { DriverService } from '../shared';
import { MessagesComponent } from './messages/messages';
import { LoadingBtn } from '../../directives/loading_btn';
import { ViewMode } from '../shared/enums';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';
import { CanDeactivateGuard } from '../guards';
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
