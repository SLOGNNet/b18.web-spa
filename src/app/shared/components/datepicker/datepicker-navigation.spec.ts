import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createGenericTestComponent } from '../../test/common';
import { getNavigationLinks } from '../../test/datepicker/common';

import { Component } from '@angular/core';

import { NgbDatepickerModule } from './datepicker.module';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerNavigation } from './datepicker-navigation';
import { NgbDate } from './ngb-date';
import { NgbDatepickerNavigationSelect } from './datepicker-navigation-select';
import { BdDropdownComponent } from '../bd-dropdown';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDropdown(dropdownComponent: BdDropdownComponent) {
  return dropdownComponent;
}

describe('ngb-datepicker-navigation', () => {

  beforeEach(() => {
    TestBed.overrideModule(
        NgbDatepickerModule, {set: {exports: [NgbDatepickerNavigation, NgbDatepickerNavigationSelect]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbDatepickerModule.forRoot()]});
  });

  it('should toggle navigation select component', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [showSelect]="showSelect" [date]="date"
          [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker-navigation>`);

    expect(getDropdown(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)).toEqual('8');

    expect(getDropdown(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue)).toEqual(2016);
  });

  // test it in another component
  xit('should send date selection event', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [showSelect]="true" [date]="date"
          [minDate]="minDate" [maxDate]="maxDate" (select)="onSelect($event)"></ngb-datepicker-navigation>`);

    const monthSelect = getDropdown(fixture.debugElement
      .query(By.css('.months-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance);

    const yearSelect = getDropdown(fixture.debugElement
      .query(By.css('.years-container'))
      .query(By.directive(BdDropdownComponent)).componentInstance._selectedValue);

    spyOn(fixture.componentInstance, 'onSelect');

    // changeSelect(monthSelect, '2');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(2016, 2, 1));

    // changeSelect(yearSelect, '2020');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(2020, 8, 1));
  });

  it('should make prev navigation button disabled', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [showSelect]="true" [date]="date"
          [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[0].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.minDate = new NgbDate(2016, 7, 30);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.minDate = new NgbDate(2016, 8, 1);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.date = new NgbDate(2016, 9, 1);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeFalsy();
  });

  it('should make next navigation button disabled', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [showSelect]="true" [date]="date"
          [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[1].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.maxDate = new NgbDate(2016, 9, 1);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.maxDate = new NgbDate(2016, 8, 31);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.date = new NgbDate(2016, 7, 1);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeFalsy();
  });

  it('should have disabled navigation buttons and year and month select boxes when disabled', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [disabled]="true" [showSelect]="true"
          [date]="date" [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[0].hasAttribute('disabled')).toBeTruthy();
    expect(links[1].hasAttribute('disabled')).toBeTruthy();

  });

  it('should send navigation events', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [date]="date" [minDate]="minDate"
          [maxDate]="maxDate" (navigate)="onNavigate($event)"></ngb-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    spyOn(fixture.componentInstance, 'onNavigate');

    // prev
    links[0].click();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith(NavigationEvent.PREV);

    // next
    links[1].click();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith(NavigationEvent.NEXT);
  });

  it('should have buttons of type button', () => {
    const fixture = createTestComponent(`<ngb-datepicker-navigation [date]="date" [minDate]="minDate"
        [maxDate]="maxDate"></ngb-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    links.forEach((link) => { expect(link.getAttribute('type')).toBe('button'); });
  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = new NgbDate(2016, 8, 1);
  minDate = new NgbDate(2015, 0, 1);
  maxDate = new NgbDate(2020, 11, 31);
  showSelect = true;

  onNavigate = () => {};
  onSelect = () => {};
}
