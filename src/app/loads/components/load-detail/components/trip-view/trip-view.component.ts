import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TripStop, StopActionTypes, StopAction } from '../../../../../models';
import { find, filter } from 'lodash';

@Component({
  selector: 'trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripViewComponent {
  @Input() tripData: TripStop;
  @Input() isExpanded: boolean;
  public phoneNumber: string = '';


  ngOnInit() {
    this.phoneNumber = find(this.tripData.facility.contactInfo, item => item.label === 'Primary Phone').value;
  }

  driverInitials(driver) {
    return driver.firstName + ' ' + driver.lastName;
  }

}
