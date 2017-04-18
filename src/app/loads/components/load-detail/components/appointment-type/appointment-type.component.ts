import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Appointment, ScheduleTypes } from '../../../../../models';

@Component({
  selector: 'appointment-type',
  templateUrl: './appointment-type.component.html',
  styleUrls: ['./appointment-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentTypeComponent implements OnInit {

 @Input() appointment: Appointment;
  constructor() { }

  ngOnInit() {
  }

  getAppointmentType(type: ScheduleTypes) {
    return ScheduleTypes.displayText(type);
  }

}
