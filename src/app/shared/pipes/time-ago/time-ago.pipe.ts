import { Pipe, ChangeDetectorRef, PipeTransform, NgZone } from '@angular/core';
import * as moment from 'moment';

const TODAY = moment().clone(),
  YESTERDAY = moment().clone().subtract(1, 'day');

moment.updateLocale('en', {
  longDateFormat: {
    LT: 'h:mm',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    l: 'M/D/YYYY',
    LL: 'MMMM Do YYYY',
    ll: 'MMM D YYYY',
    LLL: 'MMMM Do YYYY LT',
    lll: 'MMM D YYYY LT',
    LLLL: 'dddd, MMMM Do YYYY LT',
    llll: 'ddd, MMM D YYYY LT'
  }
});

@Pipe({
  name: 'bdTimeAgo',
  pure: false
})
export class BdTimeAgoPipe implements PipeTransform {

  value: Date;

  constructor(private _cdr: ChangeDetectorRef, private ngZone: NgZone) { }

  transform(value: Date): string {
    let result: string;

    if (this.isToday(value)) {
      result = moment(value).fromNow() + ', at ' + this.getTime(value);
    } else if (this.isYesterday(value)) {
      result = moment(value).calendar();
    } else {
      result = moment().format('MMM D YYYY');
    }

    return result;
  }

  isToday(val: Date): boolean {
    return moment(val).isSame(TODAY, 'd');
  }

  isYesterday(val: Date): boolean {
    return moment(val).isSame(YESTERDAY, 'd');
  }

  getTime(val: Date): string {
    return val.getHours() + ':' + (val.getMinutes() < 10 ? '0' : '') + val.getMinutes();
  }

}
