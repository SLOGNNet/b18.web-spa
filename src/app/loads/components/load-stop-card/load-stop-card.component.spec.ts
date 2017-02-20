import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { createGenericTestComponent } from '../../../shared/test/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { LoadStopCardComponent } from '.';
import { StopsLineComponent, StopPopoverComponent } from '../../../shared/components/stops-line';
import { BdPopover, BdPopoverContent } from '../../../shared/directives/bd-popover';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load, Customer, Trip, Driver, Address, Equipment } from '../../../models';

// const createTestComponent = (html: string) =>
//     createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const mockLoad = new Load(),
testTrip = new Trip(),
testDriver = new Driver(),
testAddress = Address.create(),
testCustomer = new Customer();

testAddress.id = 1,
testAddress.name = 'Main Office',
testAddress.streetAddress = '14701 Charlson Road, United States',
testAddress.city = 'Eden Prairie',
testAddress.phone = '(925) 937-8500',
testAddress.state = 'MN',
testAddress.zip = '55347',
testAddress.lat = 40.795675,
testAddress.lng = -73.93600099999998,
//
testCustomer.id = 1,
testCustomer.mc = '384859',
testCustomer.addresses = [testAddress, testAddress],
testCustomer.name = 'CH ROBINSON COMPANY INC',
testCustomer.contacts = [null],
testCustomer.email = 'carrier.services@chrobinson.com',
testCustomer.status = null,
testCustomer.type = null,
//
testDriver.id = 1,
testDriver.firstName = 'John',
testDriver.lastName = 'Doe',
testDriver.powerUnitAssigned = Equipment.create(),
testDriver.trailerAssigned = Equipment.create(),
testTrip.id = 1,
testTrip.number = 10,
testTrip.truckNumber = 1010,
testTrip.trailerNumber = 1111,
testTrip.driver = testDriver,
mockLoad.id = 1,
mockLoad.customer = testCustomer,
mockLoad.systemLoadNumber = 100500,
mockLoad.currentTrip = [testTrip];
mockLoad.stops = [];

fdescribe('LoadStopCardComponent', () => {
  let fixture: ComponentFixture<LoadStopCardComponent>,
      component: LoadStopCardComponent,
      testLoad: Load = mockLoad,
      testTrip: Trip,
      testDriver: Driver,
      testCustomer: Customer,
      testAddress: Address;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        LoadStopCardComponent,
        CustomerPopoverComponent,
        DriverPopoverComponent,
        TripPopoverComponent
      ],
    imports: [
      SharedModule
    ]});
    fixture = TestBed.createComponent(LoadStopCardComponent);
    component = fixture.componentInstance;
    //

  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display load number', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-number'));
    expect(element.nativeElement.textContent).toMatch('LD100500');
  });

  //
  // it('should display trip data', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.bottom'));
  //   console.log(element);
  //   expect(element).not.toBeNull();
  //   //expect(element.nativeElement.textContent).toMatch('LD100500');
  // });
  //
  // it('should display driver firstname', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.firstName'));
  //   expect(element).not.toBeNull();
  //   expect(element.nativeElement.textContent).toMatch('John');
  // });
  //
  // it('should display truck number', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.truckNumber'));
  //   expect(element).not.toBeNull();
  //   expect(element.nativeElement.textContent).toMatch('Tk1010');
  // });
  //
  // it('should display trailer number', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.trailerNumber'));
  //   expect(element).not.toBeNull();
  //   expect(element.nativeElement.textContent).toMatch('TI1111');
  // });
  //
  // it('should display trip number', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.tripNumber'));
  //   expect(element).not.toBeNull();
  //   expect(element.nativeElement.textContent).toMatch('TR2222');
  // });
  //
  // it('should display date in right format', () => {
  //   fixture.detectChanges();
  //   let element = fixture.debugElement.query(By.css('.start-date'));
  //   expect(element).not.toBeNull();
  //   expect(element.nativeElement.textContent).toMatch('TR2222');
  // });
  //
  //
  // it('should handle click', () => {
  //   const testComponent = createTestComponent(`<load-stop-card (click)="onClick($event)"></load-stop-card>`);
  //   spyOn(testComponent.componentInstance, 'onClick');
  //   let componentContainer = testComponent.nativeElement;
  //
  //   componentContainer.click();
  //   expect(testComponent.componentInstance.onClick).toHaveBeenCalledWith(testLoad);
  //   //let buttonDebugElement = testComponent.debugElement.query(By.css('button'));
  //    //buttonDebugElement.nativeElement.click();
  //   //  expect(testComponent.clickCount).toBe(1);
  //
  // });
});

// @Component({selector: 'bd-test', template: ''})
// class TestComponent {
//   load = testLoad;
//   onClick = () => {};
// }
