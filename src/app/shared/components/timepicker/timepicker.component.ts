import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TimePickerService } from './timepicker.service';

@Component({
  selector: 'timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [TimePickerService]
})
export class TimePickerComponent implements OnInit {

  value: string;
  display: boolean = false;
  @Output() valueChange = new EventEmitter();
  private hours: Array<Object> = [];

  constructor(private timepickerService: TimePickerService) {}

  ngOnInit() {
    this.hours = this.timepickerService.getHours();
  }

  isSelected(hour) {
    return hour.label === this.value;
  }

  onSelected(hour) {
    if (hour.label !== this.value) {
      this.valueChange.emit(hour.label);
      this.hide();
    }
  }

  hide() {
    this.display = false;
  }

  show(value = null) {
    this.value = value;
    this.display = true;
  }

}
