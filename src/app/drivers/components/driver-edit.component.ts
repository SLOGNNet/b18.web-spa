import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Driver } from '../../models';
import { BaseRootEditComponent } from '../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DriverActions } from '../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { DriverForm } from '../../forms';
import { selectDetailDriver } from '../../store';

@Component({
  selector: 'driver-edit',
  templateUrl: './driver-edit.component.html'
})
export class DriverEditComponent extends BaseRootEditComponent<Driver> {
  @ViewChild(DriverForm) driverFormComponent: DriverForm;

  private anchors = [{
    id: 'driver-personal-information',
    title: 'Personal Info'
  }, {
    id: 'driver-payment',
    title: 'Payment'
  }, {
    id: 'driver-contact',
    title: 'Contact'
  }, {
    id: 'driver-address',
    title: 'Address'
  }, {
    id: 'driver-license',
    title: 'License'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    private driverActions: DriverActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(driverActions, ngRedux.select(selectDetailDriver),
        ngRedux.select(state => state.ui.drivers.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.driverFormComponent && this.driverFormComponent.driverForm.dirty;
  }

  getItemName() {
    return 'Driver';
  }
}
