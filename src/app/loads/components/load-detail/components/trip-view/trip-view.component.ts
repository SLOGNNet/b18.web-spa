import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppointmentTypes, Appointment, TripStop, StopActionTypes, StopAction } from '../../../../../models';
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

  public appointmentType: string = '';
  public phoneNumber: string = '';


  ngOnInit() {
    this.appointmentType = this.getAppointmentType(this.tripData.appointment.type);
    this.phoneNumber = find(this.tripData.facility.contactInfo, item => item.label === 'Primary Phone').value;
  }

  getAppointmentType(type: AppointmentTypes) {
    return AppointmentTypes.displayText(type);
  }

  driverInitials(driver) {
    return driver.firstName + ' ' + driver.lastName;
  }

}
