import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Driver } from '../../../models';
// import { BaseEditComponent } from '../../base';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import { DriverActions } from '../../actions';
// import { NgRedux, select } from 'ng2-redux';
// import { Observable } from 'rxjs/Observable';
// import { IAppState } from '../../store';
// import { DriverForm } from '../../forms';

@Component({
  selector: 'driver-view',
  templateUrl: './driver-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverViewComponent  {
  // @ViewChild(DriverForm) driverFormComponent: DriverForm;
  @Input() driver: Driver;

  private anchors = [{
    id: 'driver-personal-information',
    title: 'Information'
  }, {
    id: 'driver-contact',
    title: 'Equipment Associations'
  }, {
    id: 'driver-address',
    title: 'License'
  }];

  // constructor(
  //   private cdr: ChangeDetectorRef,
  //   driverActions: DriverActions,
  //   route: ActivatedRoute,
  //   location: Location,
  //   ngRedux: NgRedux<IAppState>) {
  //     super(driverActions, ngRedux.select(state => state.drivers.selected), ngRedux.select(state => state.drivers.isLoading), route, location);
  // }
  //
  // isDetailsChanged() {
  //   return this.driverFormComponent && this.driverFormComponent.driverForm.dirty;
  // }
}
