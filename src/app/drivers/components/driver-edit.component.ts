import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Driver } from '../../models';
import { BaseEditComponent } from '../../base';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DriverActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';
import { DriverForm } from '../../forms';

@Component({
  selector: 'driver-edit',
  templateUrl: './driver-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverEditComponent extends BaseEditComponent<Driver> {
  @ViewChild(DriverForm) driverFormComponent: DriverForm;

  private anchors = [{
    id: 'driver-personal-information',
    title: 'Personal Info'
  }, {
    id: 'driver-contact',
    title: 'Contact'
  }, {
    id: 'driver-address',
    title: 'Address'
  }, {
    id: 'driver-payment',
    title: 'Payment'
  }, {
    id: 'driver-license',
    title: 'License'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    private driverActions: DriverActions,
    route: ActivatedRoute,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(driverActions, ngRedux.select(state => state.drivers.selected), ngRedux.select(state => state.drivers.isLoading), route, location);
  }

  onPlaceUpdate(data) {
    this.driverActions.updatePlace(this.selectedItem, data.placeId);
  }

  isDetailsChanged() {
    return this.driverFormComponent && this.driverFormComponent.driverForm.dirty;
  }
}
