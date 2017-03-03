import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Driver } from '../../models';
import { BaseDetailComponent } from '../../base';
import { ActivatedRoute, Params } from '@angular/router';
import { DriverActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';

@Component({
  selector: 'driver-detail',
  templateUrl: './driver-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverDetailComponent extends BaseDetailComponent<Driver> {
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
    ngRedux: NgRedux<IAppState>) {
      super(driverActions, ngRedux.select(state => state.drivers.selected), route);
  }
}
