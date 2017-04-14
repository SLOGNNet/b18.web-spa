import { Component, OnInit, Input } from '@angular/core';
import { Appointment, AppointmentTypes } from '../../../../../models';

@Component({
  selector: 'appointment-type',
  templateUrl: './appointment-type.component.html',
  styleUrls: ['./appointment-type.component.scss']
})
export class AppointmentTypeComponent implements OnInit {

 @Input() appointment: Appointment;
  constructor() { }

  ngOnInit() {
  }

  getAppointmentType(type: AppointmentTypes) {
    return AppointmentTypes.displayText(type);
  }

}
