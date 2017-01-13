import { Injectable } from '@angular/core';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  {id: '1', month: 'January'},
  {id: '2', month: 'February'},
  {id: '3', month: 'March'},
  {id: '4', month: 'April'},
  {id: '5', month: 'May'},
  {id: '6', month: 'June'},
  {id: '7', month: 'July'},
  {id: '8', month: 'August'},
  {id: '9', month: 'September'},
  {id: '10', month: 'October'},
  {id: '11', month: 'November'},
  {id: '12', month: 'December'}];

/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 */
@Injectable()
export abstract class NgbDatepickerI18n {
  /**
   * Returns the short week day name to display in the heading of the month view.
   * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
   */
  abstract getWeekdayName(weekday: number): string;

  /**
   * Returns the month name to display in the date picker navigation.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec
   */
  abstract getMonthName(month: number): string;

  /**
   * Returns the month collection.
   */
  abstract getMonthCollection(): Array<Object>;
}

@Injectable()
export class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
  getWeekdayName(weekday: number): string { return WEEKDAYS[weekday - 1]; }

  getMonthName(month: number): string { return MONTHS[month - 1].month; }

  getMonthCollection(): Array<Object> { return MONTHS; }
}
