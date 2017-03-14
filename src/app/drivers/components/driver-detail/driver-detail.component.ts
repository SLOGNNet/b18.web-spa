import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Driver, DriverTypes, DriverPaymentTypes, License } from '../../../models';
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
  public restrictionsTypes: string;
  public endorsmentsTypes: string;

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


  constructor(
    private cdr: ChangeDetectorRef,
    driverActions: DriverActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
    super(driverActions, ngRedux.select(state => state.drivers.selected), router, route);
  }

  ngOnInit() {
      this.restrictionsTypes = this.selectedItem.license.restrictions.split(' ').join(', ');
      this.endorsmentsTypes = this.selectedItem.license.endorsments.split(' ').join(', ');
  }

  get driverType() {
    return Driver.getTypeText(this.selectedItem.type);
  }

  get paymentTypeText() {
    return Driver.getPaymentTypeText(this.selectedItem.paymentType);
  }

  get licenseClassText() {
    return License.getLicenseClassText(this.selectedItem.license.class);
  }

  // ngOnInit() {
  //   console.log(this.selectedItem);
  // }
}
