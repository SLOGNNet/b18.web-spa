import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { LoadStopCardComponent } from '.';
import { StopsLineComponent, StopPopoverComponent } from '../../../shared/components/stops-line';
import { BdPopover, BdPopoverContent } from '../../../shared/directives/bd-popover';
import { CustomerPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load, Customer, Trip, Driver } from '../../../models';



describe('ListComponent', () => {

  it('should render list', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(LoadStopCardComponent).then((componentFixture: ComponentFixture) => {
      const element = componentFixture.nativeElement;
      componentFixture.componentInstance.users = ['John'];
      componentFixture.detectChanges();
      expect(element.querySelectorAll('span').length).toBe(1);
    });
  }));

});


describe('LoadStopCardComponent', () => {
  let fixture: ComponentFixture<LoadStopCardComponent>,
      component: LoadStopCardComponent,
      testLoad: Load,
      testTrip: Trip,
      testDriver: Driver;


  beforeEach(async(() => {
    testDriver = new Driver();
    testDriver.id = 1;
    testDriver.firstName = 'John';
    testDriver.lastName = 'Doe';

    testTrip = new Trip();
    testTrip.id = 1;
    testTrip.number = 10;
    testTrip.truckNumber = 1010;
    testTrip.trailerNumber = 1111;
    testTrip.number = 2222;

    testLoad = new Load();
    testLoad.id = 1;
    testLoad.systemLoadNumber = 100500;
    testLoad.currentTrip = [testTrip];

    TestBed.configureTestingModule({
      declarations: [
        LoadStopCardComponent,
        BdPopover,
        BdPopoverContent,
        CustomerPopoverComponent,
        DriverPopoverComponent,
        TripPopoverComponent,
        StopsLineComponent,
        StopPopoverComponent
    ]}).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoadStopCardComponent);
      component = fixture.componentInstance;
    });
  }));


  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display load number', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-name'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('LD100500');
  });

  it('should display trip data', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.bottom'));
    console.log(element);
    expect(element).not.toBeNull();
    //expect(element.nativeElement.textContent).toMatch('LD100500');
  });

  it('should display driver firstname', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstName'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('John');
  });

  it('should display truck number', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.truckNumber'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('Tk1010');
  });

  it('should display trailer number', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.trailerNumber'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('TI1111');
  });

  it('should display trip number', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.tripNumber'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('TR2222');
  });

  it('should display date in right format', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toMatch('TR2222');
  });






});
