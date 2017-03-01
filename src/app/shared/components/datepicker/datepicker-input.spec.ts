import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createGenericTestComponent } from '../../test/common';

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerModule } from './datepicker.module';
import { NgbInputDatepicker } from './datepicker-input';
import { NgbDatepicker } from './datepicker';
import { NgbDateStruct } from './ngb-date-struct';
import { NgbDate } from './ngb-date';
import { fireEvent } from '../../test/helpers/domHelper';

const createTestCmpt = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('NgbInputDatepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
      { declarations: [TestComponent], imports: [NgbDatepickerModule.forRoot(), FormsModule, ReactiveFormsModule ]});
  });

  describe('open, close and toggle', () => {

    it('should allow controlling datepicker popup from outside', () => {
      const fixture = createTestCmpt(`
          <bd-input ngbDatepicker #d="ngbDatepicker">
          <button (click)="open(d)">Open</button>
          <button (click)="close(d)">Close</button>
          <button (click)="toggle(d)">Toggle</button>`);

      const buttons = fixture.nativeElement.querySelectorAll('button');

      buttons[0].click();  // open
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();

      buttons[1].click();  // close
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();
    });
  });

  describe('ngModel interactions', () => {

    it('should format bound date as ISO (by default) in the input field', fakeAsync(() => {
      const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="date">`);
      const input = fixture.nativeElement.querySelector('input');

      fixture.componentInstance.date = '2016-10-10';
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('2016-10-10');
      fixture.componentInstance.date = '2016-10-15';
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('2016-10-15');
    }));

    it('should parse user-entered date as ISO (by default)', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('change', { target: { value: '2016-09-10' } });
      expect(fixture.componentInstance.date).toEqual('2016-09-10');
    });

    xit('should set only valid dates', fakeAsync(() => {
      const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="date">`);
      const input = fixture.nativeElement.querySelector('input');

      fixture.componentInstance.date = null;
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('');

      fixture.componentInstance.date = undefined;
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('');

      fixture.componentInstance.date = <any>{};
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('');

      fixture.componentInstance.date = <any>new Date();
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('');

      fixture.componentInstance.date = <any>new NgbDate(300000, 1, 1);
      fixture.detectChanges();
      tick();
      expect(input.value).toBe('');

    }));

    it('should propagate empty string to model when a user enters invalid date', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('change', { target: { value: 'aaa' } });
      expect(fixture.componentInstance.date).toBe('');

      inputDebugEl.triggerEventHandler('change', { target: { value: '300000-1-1' } });
      expect(fixture.componentInstance.date).toBe('');
    });

    it('should propagate disabled state', fakeAsync(() => {
      const fixture = createTestCmpt(`
        <input ngbDatepicker [(ngModel)]="date" #d="ngbDatepicker" [disabled]="isDisabled">
        <button (click)="open(d)">Open</button>`);
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const input = fixture.nativeElement.querySelector('input');

      button.click();  // open
      tick();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
      expect(input.disabled).toBeTruthy();

      fixture.componentInstance.isDisabled = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
      expect(input.disabled).toBeFalsy();

    }));
  });

  describe('options', () => {

    it('should propagate the "dayTemplate" option', () => {
      const fixture = createTestCmpt(`<template #t></template><input ngbDatepicker [dayTemplate]="t">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.dayTemplate).toBeDefined();
    });

    it('should propagate the "displayMonths" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [displayMonths]="3">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.displayMonths).toBe(3);
    });

    it('should propagate the "firstDayOfWeek" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [firstDayOfWeek]="5">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.firstDayOfWeek).toBe(5);
    });

    it('should propagate the "markDisabled" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [markDisabled]="noop">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.markDisabled).toBeDefined();
    });

    it('should propagate the "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [minDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.minDate).toEqual({ year: 2016, month: 9, day: 13 });
    });

    it('should propagate the "maxDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [maxDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.maxDate).toEqual({ year: 2016, month: 9, day: 13 });
    });

    it('should propagate the "outsideDays" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker outsideDays="collapsed">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.outsideDays).toEqual('collapsed');
    });

    it('should propagate the "navigation" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker navigation="none">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.navigation).toBe('none');
    });

    it('should propagate the "showWeekdays" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [showWeekdays]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.showWeekdays).toBeTruthy();
    });

    it('should propagate the "showWeekNumbers" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [showWeekNumbers]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.showWeekNumbers).toBeTruthy();
    });

    it('should propagate the "startDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [startDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.startDate).toEqual({ year: 2016, month: 9, day: 13 });
    });

    xit('should propagate model as "startDate" option when "startDate" not provided', fakeAsync(() => {
      const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      tick();
      fixture.detectChanges();
      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.startDate).toEqual(NgbDate.from({ year: 2016, month: 9, day: 13 }));
    }));

    it('should relay the "navigate" event', () => {
      const fixture =
        createTestCmpt(`<input ngbDatepicker [startDate]="{year: 2016, month: 9}" (navigate)="onNavigate($event)">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      spyOn(fixture.componentInstance, 'onNavigate');

      dpInput.open();
      fixture.detectChanges();
      expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({ current: null, next: { year: 2016, month: 9 } });

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      dp.navigateTo({ year: 2018, month: 4 });
      expect(fixture.componentInstance.onNavigate)
        .toHaveBeenCalledWith({ current: { year: 2016, month: 9 }, next: { year: 2018, month: 4 } });
    });
  });
});

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  date: string;
  isDisabled;

  onNavigate() { }

  open(d: NgbInputDatepicker) { d.open(); }

  close(d: NgbInputDatepicker) { d.close(); }

  toggle(d: NgbInputDatepicker) { d.toggle(); }

  noop() { }
}
