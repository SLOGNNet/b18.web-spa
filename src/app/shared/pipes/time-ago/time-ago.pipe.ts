import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncPipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
  name: 'bdTimeAgo',
  pure: false
})
export class BdTimeAgoPipe implements PipeTransform {

  value: Date;
  timer: Observable<string>;
  private readonly async: AsyncPipe;

  constructor(private _cdr: ChangeDetectorRef) {
   this.async = new AsyncPipe(_cdr);
  }

  transform(val: any, ...args: any[]): string {
    this.value = val;
    if (!this.timer) {
      this.timer = this.getObservable();
    }
    return this.async.transform(this.timer);
  }

  isToday(val: Date): boolean {
    return moment(val).isSame(moment().clone().startOf('day'), 'd');
  }

  isYesterday(val: Date): boolean {
    return moment(val).isSame(moment().clone().subtract(1, 'days').startOf('day'), 'd');
  }

  private getObservable()
    {
        return Observable.interval(1000).startWith(0).map(() =>
        {
          let result: string;

          if (this.isToday(this.value)) {
            result = moment(this.value).fromNow() + ', at ' + moment(this.value).format('HH:mm');
          } else if (this.isYesterday(this.value)) {
            result = 'Yesterday at ' + moment(this.value).format('HH:mm');
          } else {
            result = moment().format('MMM D YYYY');
          }
          return result;
        });
    };

}
