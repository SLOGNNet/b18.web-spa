import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from './utils';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { NgbCalendar } from './ngb-calendar';

@Component({
  selector: 'ngb-datepicker-navigation-select',
  styleUrls: ['./styles/datepicker-navigation-select.scss'],
  template:
  `
  <div class="datepicker-navigation-select">
    <div class="dropdown-container">
    <bd-dropdown
        defaultTitleText='Select month'
        [dropdownItemTemplate]="dropdownMonthTemplate"
        (onItemClick)="triggerMonthClick($event)"
        selectedValue="2"
        [isBorder]="true"
        keyField="id"
        valueField="month"
        [items]="i18n.getMonthCollection()">
    </bd-dropdown>
    </div>
    <template #dropdownMonthTemplate let-item="item">
          <span class="dropdown-item">{{item.month}}</span>
    </template>
    `
    +
    `

      <div class="dropdown-container">
      <bd-dropdown
          [defaultTitleText]="'Select Year'"
          [dropdownItemTemplate]="dropdownYearTemplate"
          [isBorder]="true"
          keyField="id"
          selectedValue="2"
          (onItemClick)="triggerYearClick($event)"
          valueField="year"
          [items]="years">
      </bd-dropdown>
      </div>
      <template #dropdownYearTemplate let-item="item">
        <span class="dropdown-item">{{item.year}}</span>
      </template>
      </div>
      `
   // template needs to be formatted in a certain way so we don't add empty text nodes
})
export class NgbDatepickerNavigationSelect implements OnChanges {
  months: number[];
  years: Array<Object>;

  @Input() date: NgbDate;
  @Input() disabled: boolean;
  @Input() maxDate: NgbDate;
  @Input() minDate: NgbDate;

  @Output() select = new EventEmitter<NgbDate>();

  constructor(public i18n: NgbDatepickerI18n, private calendar: NgbCalendar) { this.months = calendar.getMonths(); }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maxDate'] || changes['minDate']) {
      this._generateYears();
      this._generateMonths();
    }

    if (changes['date'] && changes['date'].currentValue.year !== changes['date'].previousValue.year) {
      this._generateMonths();
    }
  }

  triggerMonthClick(item) {
    this.select.emit(new NgbDate(this.date.year, toInteger(item.key), 1));
  }

  triggerYearClick(item) {
    this.select.emit(new NgbDate(toInteger(item.value), this.date.month, 1));
  }

  private _generateMonths() {
    this.months = this.calendar.getMonths();

    if (this.date.year === this.minDate.year) {
      const index = this.months.findIndex(month => month === this.minDate.month);
      this.months = this.months.slice(index);
    }

    if (this.date.year === this.maxDate.year) {
      const index = this.months.findIndex(month => month === this.maxDate.month);
      this.months = this.months.slice(0, index + 1);
    }
  }

  private _generateYears() {
    let generateYears = [];
    for ( let i = 0; i < this.maxDate.year - this.minDate.year + 1; i++) {
      generateYears[i] = {
        id: i + '',
        year: this.minDate.year + i
      };
    }
    this.years = generateYears;
  }
}
