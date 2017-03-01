import { TestBed, ComponentFixture } from '@angular/core/testing';
import { createGenericTestComponent } from '../../test/common';
import { getMonthSelect, getYearSelect } from '../../test/datepicker/common';
import { By } from '@angular/platform-browser';
import { NgbDatepickerI18nDefault } from './datepicker-i18n';

import { Component } from '@angular/core';

import { NgbDatepickerModule } from './datepicker.module';
import { NgbDatepickerNavigationSelect } from './datepicker-navigation-select';
import { NgbDate } from './ngb-date';

import { BdDropdownComponent } from '../bd-dropdown';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getOptionValues(element: HTMLSelectElement): string[] {
  return Array.from(element.options).map(x => (x as HTMLOptionElement).value);
}

function getDropdownItems(dropdownComponent: BdDropdownComponent)  {
  return dropdownComponent.items;
}

function getYears(maxDate, minDate) {
   let generateYears = [];
    for ( let i = 0; i < maxDate.year - minDate.year + 1; i++) {
      generateYears[i] = {
        year: minDate.year + i
      };
    }
  return generateYears;
}

function changeSelect(element: HTMLSelectElement, value: string) {
  element.value = value;
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', true, true);
  element.dispatchEvent(evt);
}

const i18n = new NgbDatepickerI18nDefault();

describe('ngb-datepicker-navigation-select', () => {

  beforeEach(() => {
    TestBed.overrideModule(NgbDatepickerModule, {set: {exports: [NgbDatepickerNavigationSelect]}});
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        NgbDatepickerModule.forRoot()
      ]
    });
  });

   it('should generate month options correctly', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance))
    .toEqual(i18n.getMonthCollection());
  });


  // currently we generate dropdown with full month collection
  xit('should generate month options correctly depends on min/max dates', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);
    fixture.componentInstance.minDate = new NgbDate(2016, 7, 1);
    fixture.detectChanges();
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance)).toEqual(['7', '8', '9', '10', '11', '12']);

    fixture.componentInstance.maxDate = new NgbDate(2016, 9, 1);
    fixture.detectChanges();
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance)).toEqual(['7', '8', '9']);

    fixture.componentInstance.minDate = new NgbDate(2015, 1, 1);
    fixture.detectChanges();

     expect(getDropdownItems(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance)).toEqual([
        '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ]);
  });

  xit('should update months when current date changes', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    fixture.componentInstance.minDate = new NgbDate(2015, 7, 1);
    fixture.componentInstance.maxDate = new NgbDate(2017, 7, 1);
    fixture.detectChanges();
    expect(getOptionValues(getMonthSelect(fixture.nativeElement))).toEqual([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
    ]);

    fixture.componentInstance.date = new NgbDate(2015, 9, 1);
    fixture.detectChanges();
    expect(getOptionValues(getMonthSelect(fixture.nativeElement))).toEqual(['7', '8', '9', '10', '11', '12']);

    fixture.componentInstance.date = new NgbDate(2017, 5, 1);
    fixture.detectChanges();
    expect(getOptionValues(getMonthSelect(fixture.nativeElement))).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });

  it('should generate year options correctly', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    const yearSelect = getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance);

    let testMinDate = new NgbDate(2015, 1, 1), testMaxDate = new NgbDate(2020, 1, 1);
    fixture.detectChanges();
    expect(yearSelect).toEqual(getYears(testMaxDate, testMinDate));

  });

  it('should generate year options correctly depends on min/max dates', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    const yearSelectItems = getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance);
    
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance))
    .toEqual([{ year: 2015 }, { year: 2016 }, { year: 2017 }, { year: 2018 }, { year: 2019 }, { year: 2020 } ]);

    fixture.componentInstance.maxDate = new NgbDate(2017, 1, 1);
    fixture.detectChanges();
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance))
    .toEqual([{ year: 2015 }, { year: 2016 }, { year: 2017 }]);

    fixture.componentInstance.minDate = new NgbDate(2014, 1, 1);
    fixture.detectChanges();
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance))
    .toEqual([{ year: 2014 }, { year: 2015 }, { year: 2016 }, { year: 2017 }]);

    fixture.componentInstance.minDate = new NgbDate(2017, 1, 1);
    fixture.detectChanges();
    expect(getDropdownItems(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance))
    .toEqual([{ year: 2017 }]);
  });

  it('should send month selection events', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate" (click)="onItemClick($event)">`);

    const monthDropdown = fixture.debugElement.query(By.css('.months-container')).query(By.directive(BdDropdownComponent)).nativeElement;
    spyOn(fixture.componentInstance, 'onItemClick');
    monthDropdown.click();
    expect(fixture.componentInstance.onItemClick).toHaveBeenCalled();
  });

  it('should send year selection events', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate" (click)="onItemClick($event)">`);

    const yearDropdown = fixture.debugElement.query(By.css('.years-container')).query(By.directive(BdDropdownComponent));
    spyOn(fixture.componentInstance, 'onItemClick');
    yearDropdown.nativeElement.click();
    expect(fixture.componentInstance.onItemClick).toHaveBeenCalled();
  });

  it('should select months and years when date changes', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    console.log(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance);


    expect(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)
    .toBe('8');

    expect(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)
    .toBe(2016);

    fixture.componentInstance.date = new NgbDate(2017, 9, 22);
    fixture.detectChanges();
    expect(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)
    .toBe('9');

    expect(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)
    .toBe(2017);
  });

  // currently we don't use select boxes  
  xit('should have disabled select boxes when disabled', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker-navigation-select [disabled]="true" [date]="date" [minDate]="minDate" [maxDate]="maxDate">`);

    expect(getMonthSelect(fixture.nativeElement).disabled).toBe(true);
    expect(getYearSelect(fixture.nativeElement).disabled).toBe(true);
  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = new NgbDate(2016, 8, 22);
  minDate = new NgbDate(2015, 1, 1);
  maxDate = new NgbDate(2020, 1, 1);

  triggerMonthClick = () => {};
  onItemClick = () => {};
  triggerYearClick = () => {};
  onSelect = () => {};
}
