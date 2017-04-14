import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../../../../models';

@Component({
  selector: 'appointment-range',
  templateUrl: './appointment-range.component.html',
  styleUrls: ['./appointment-range.component.scss']
})
export class AppointmentRangeComponent implements OnInit {

  @Input() appointment: Appointment;
  constructor() { }

  ngOnInit() {
  }
}
