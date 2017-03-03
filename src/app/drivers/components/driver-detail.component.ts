import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Driver } from '../../models';
import { BaseDetailComponent } from '../../base';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DriverActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';
import { DriverForm } from '../../forms';

@Component({
  selector: 'driver-detail',
  templateUrl: './driver-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverDetailComponent extends BaseDetailComponent<Driver> {
  @ViewChild(DriverForm) companyFormComponent: DriverForm;

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
    id: 'driver-licence',
    title: 'Licence'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }];

  constructor(
    driverActions: DriverActions,
    route: ActivatedRoute,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(driverActions, ngRedux.select(state => state.drivers.selected), route, location);
  }

  isDetailsChanged() {
    return this.companyFormComponent.driverForm.dirty;
  }
}
