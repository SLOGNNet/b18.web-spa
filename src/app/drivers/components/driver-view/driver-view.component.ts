import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Driver } from '../../../models';
import { DriverService } from '../../../shared';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../../store';
import { DriverActions } from '../../../actions';

@Component({
  selector: 'driver-view',
  templateUrl: './driver-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverViewComponent {
  @Input() driver: Driver;
  public testDriver: Driver;

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

  constructor(private driverService: DriverService, private ngRedux: NgRedux<IAppState>, driverActions: DriverActions) {
    this.driverService.getDetails(1).subscribe(driver => {
      this.ngRedux.dispatch({ type: DriverActions.SELECT_DRIVER, driver });
      this.testDriver = driver;
    });
  }

}
