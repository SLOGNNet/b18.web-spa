import { Component, Input } from '@angular/core';
import * as moment from 'moment';

const REFERENCE = moment(),
      TODAY = REFERENCE.clone(),
      YESTERDAY = REFERENCE.clone().subtract(1, 'day');

@Component({
  selector: 'bd-time-ago',
  templateUrl: './bd-time-ago.component.html'
})
export class BdTimeAgoComponent {

@Input() private eventDate: Date = new Date();
private currentDate: Date = new Date();

  get isToday(): boolean {
    return moment(this.eventDate).isSame(TODAY, 'd');
  }

  get isYesterday(): boolean {
      return moment(this.eventDate).isSame(YESTERDAY, 'd');
  }

  get isEarlierThanYesterday(): boolean {
    return !this.isToday && !this.isYesterday;
  }

  get eventTime(): string {
     return this.eventDate.getHours() + ':' + (this.eventDate.getMinutes() < 10 ? '0' : '') + this.eventDate.getMinutes();
   }
}
