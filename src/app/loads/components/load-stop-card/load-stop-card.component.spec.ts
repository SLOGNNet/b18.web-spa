import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { LoadStopCardComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import TestData from'../../../shared/test/testdata';
import { CustomerPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load, LoadStatuses, Customer, Trip, Driver, Address, Equipment, Stop, StopTypes, StopStatuses, Facility } from '../../../models';


const mockLoad = new Load(),
testTrip = new Trip(),
testDriver = new Driver(),
testAddress = Address.create(),
testCustomer = new Customer(),
testStop1 = Stop.create(StopTypes.Pickup),
testStop2 = Stop.create(StopTypes.Pickup);
// test address
testAddress.id = 1,
testAddress.name = 'Main Office',
testAddress.streetAddress = '14701 Charlson Road, United States',
testAddress.city = 'Eden Prairie',
testAddress.phone = '(925) 937-8500',
testAddress.state = 'MN',
testAddress.zip = '55347',
testAddress.lat = 40.795675,
testAddress.lng = -73.93600099999998,
// test customer
testCustomer.id = 1,
testCustomer.mc = '384859',
testCustomer.addresses = [testAddress, testAddress],
testCustomer.name = 'CH ROBINSON COMPANY INC',
testCustomer.contacts = [null],
testCustomer.email = 'carrier.services@chrobinson.com',
testCustomer.status = null,
testCustomer.type = null,
// test driver
testDriver.id = 1,
testDriver.firstName = 'John',
testDriver.lastName = 'Doe',
testDriver.powerUnitAssigned = Equipment.create(),
testDriver.trailerAssigned = Equipment.create(),
// test trip
testTrip.id = 1,
testTrip.number = 1212,
testTrip.truckNumber = 1010,
testTrip.trailerNumber = 1111,
testTrip.driver = testDriver,
// stops
testStop1.id = 1,
testStop1.notes = 'notes',
testStop1.type = StopTypes.Pickup,
testStop1.address = testAddress,
testStop1.date = null,
testStop1.facility = Facility.create(),
testStop1.status = StopStatuses.InProgress,
testStop2.id = 2,
testStop2.notes = 'notes',
testStop2.type = StopTypes.Pickup,
testStop2.address = testAddress,
testStop2.date = null,
testStop2.facility = Facility.create(),
testStop2.status = StopStatuses.InProgress,
// test load
mockLoad.id = 1,
mockLoad.customer = testCustomer,
mockLoad.systemLoadNumber = 100500,
mockLoad.customerLoadNumber = 500100,
mockLoad.currentTrip = [testTrip],
mockLoad.status = LoadStatuses.Completed,
mockLoad.stops = [ testStop1, testStop2 ];
// mockLoad.stops[0].date = new Date();

fdescribe('LoadStopCardComponent', () => {
  let fixture: ComponentFixture<LoadStopCardComponent>,
      component: LoadStopCardComponent,
      testLoad: Load;

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
    testLoad = mockLoad;
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

  it('should display customer load number', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-load-number'));
    expect(element.nativeElement.textContent).toMatch('500100');
  });


  it('should display driver firstname', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstName'));
    expect(element.nativeElement.textContent).toMatch('John');
  });

  it('should display truck number', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.truckNumber'));
    expect(element.nativeElement.textContent).toMatch('Tk1010');
  });

  it('should display trailer number', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.trailerNumber'));
    expect(element.nativeElement.textContent).toMatch('TI1111');
  });

  it('should display trip number', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.tripNumber'));
    expect(element.nativeElement.textContent).toMatch('TR1212');
  });

  it('should display date in right format', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element.nativeElement.textContent).toMatch('01/09');
  });

  it('should display right status text', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status'));
    expect(element.nativeElement.textContent).toMatch(Load.getStatusText(LoadStatuses.Completed));
  });

   it('should display right status color', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status'));
    expect(element.nativeElement.getAttribute('style')).toContain('background-color: rgb(133, 209, 131)');
  });



  it('should display stops line when stops length is greater than 1', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.right'));
    expect(component.load.stops.length).toBeGreaterThan(1);
  });


  it('should display right address of first stop in load', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstStopAddress'));
    expect(element.nativeElement.textContent).toMatch('Eden Prairie, MN');
  });

  it('should display right address of last stop in load', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.lastStopAddress'));
    expect(element.nativeElement.textContent).toMatch('Eden Prairie, MN');
  });

  //
  it('should handle click', () => {
    component.load = testLoad;
    spyOn(component, 'onClick');
    let element = fixture.debugElement.query(By.css('.load-stop-card-section'));
    element.nativeElement.click();
      fixture.whenStable().then(() => {
            expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
      });
    });
});
