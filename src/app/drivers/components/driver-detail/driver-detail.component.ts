import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Driver, DriverTypes, DriverPaymentTypes } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DriverActions } from '../../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';
import { DriverForm } from '../../../forms';

@Component({
  selector: 'driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverDetailComponent extends BaseDetailComponent<Driver> {
  private anchors = [{
    id: 'information',
    title: 'Information'
  }, {
      id: 'equipment-associations',
      title: 'Equipment Associations'
    }, {
      id: 'license',
      title: 'License'
    }];

    get driverFullName() {
      return this.selectedItem.firstName + ' ' + this.selectedItem.lastName;
    }

  constructor(
    driverActions: DriverActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>,
    protected cdr: ChangeDetectorRef) {
    super(driverActions, ngRedux.select(state => state.drivers.selected), router, route, cdr);
  }
}
