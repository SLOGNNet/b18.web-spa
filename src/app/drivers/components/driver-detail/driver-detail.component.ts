import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Driver } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverActions } from '../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store';
import { selectDetailDriver } from '../../../store';

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
        id: 'payment',
        title: 'Payment'
      }, {
      id: 'license',
      title: 'License'
    }];

    get fullName() {
      return `${this.selectedItem.firstName} ${this.selectedItem.middleName} ${this.selectedItem.lastName}`;
    }

  constructor(
    driverActions: DriverActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>,
    protected cdr: ChangeDetectorRef) {
    super(driverActions, ngRedux.select(selectDetailDriver), router, route, cdr);
  }
}
