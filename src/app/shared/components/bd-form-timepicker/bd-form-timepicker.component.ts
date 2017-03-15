import { Component, Input, Output, ViewChild, OnChanges, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { TimePickerComponent } from '../timepicker';

@Component({
  selector: 'bd-form-timepicker',
  templateUrl: './bd-form-timepicker.component.html',
  styleUrls: ['./bd-form-timepicker.component.scss']
})
export class BdFormTimePicker implements OnChanges {

  @Input() timeFormat: string = 'HH:mm';
  @Input() timePlaceholder: string = 'HH:MM';
  @Input() date: any;
  @Output() valueChange = new EventEmitter();
  @ViewChild('timepicker') timepicker: TimePickerComponent;
  private time: string;

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.date && changes.date.currentValue) {
      this.time = moment(changes.date.currentValue).format(this.timeFormat);
    }
  }

  onFocus() {
    this.timepicker.show(this.time);
  }

  onClickOutside() {
    this.timepicker.hide();
  }

  onTimeChange(value) {
    this.valueChange.emit(value);
    this.time = value;
  }

}
