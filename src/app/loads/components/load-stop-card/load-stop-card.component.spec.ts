import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadStopCardComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load, LoadStatuses, Customer, Trip, Driver, Address, Equipment, Stop, StopTypes, StopStatuses, Facility } from '../../../models';

const mockLoad = new Load();
const testTrip = new Trip();
const testDriver = new Driver();
const testAddress = new Address();
const testCustomer = new Customer();
const testStop1 = new Stop();
const testStop2 = new Stop();
// test address
testAddress.id = 1;
testAddress.name = 'Main Office';
testAddress.streetAddress = '14701 Charlson Road, United States';
testAddress.city = 'Eden Prairie';
testAddress.phone = '(925) 937-8500';
testAddress.state = 'MN';
testAddress.zip = '55347';
testAddress.lat = 40.795675;
testAddress.lng = -73.93600099999998;
// test customer
testCustomer.id = 1;
testCustomer.mc = '384859';
testCustomer.addresses = [testAddress, testAddress];
testCustomer.name = 'CH ROBINSON COMPANY INC';
testCustomer.contacts = [null];
testCustomer.email = 'carrier.services@chrobinson.com';
testCustomer.status = null;
testCustomer.type = null;
// test driver
testDriver.id = 1;
testDriver.firstName = 'John';
testDriver.lastName = 'Doe';
testDriver.powerUnitAssigned = Equipment.create();
testDriver.trailerAssigned = Equipment.create();
// test trip
testTrip.id = 1;
testTrip.number = 1212;
testTrip.truckNumber = 1010;
testTrip.trailerNumber = 1111;
testTrip.driver = testDriver;
// test stops
testStop1.id = 1;
testStop1.notes = 'notes';
testStop1.type = StopTypes.Pickup;
testStop1.address = testAddress;
testStop1.date = new Date(2017, 0, 9);
testStop1.facility = Facility.create();
testStop1.status = StopStatuses.InProgress;
testStop2.id = 2;
testStop2.notes = 'notes';
testStop2.type = StopTypes.Pickup;
testStop2.address = testAddress;
testStop2.date = new Date(2017, 1, 10);
testStop2.facility = Facility.create();
testStop2.status = StopStatuses.InProgress;
// test load
mockLoad.id = 1;
mockLoad.customer = testCustomer;
mockLoad.systemLoadNumber = 100500;
mockLoad.customerLoadNumber = 500100;
mockLoad.currentTrip = [testTrip];
mockLoad.status = LoadStatuses.Completed;
mockLoad.stops = [ testStop1, testStop2 ];

describe('LoadStopCardComponent', () => {
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

  it('should display start date in right format', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element.nativeElement.textContent).toMatch('01/09');
  });

  it('should display end date in right format', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.end-date'));
    expect(element.nativeElement.textContent).toMatch('02/10');
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
    expect(element.nativeElement.getAttribute('style')).toContain('background: rgb(133, 209, 131)');
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

  it('should handle click', () => {
    component.load = testLoad;
    spyOn(component, 'onClick');
    let element = fixture.debugElement.query(By.css('.load-stop-card-section'));
    element.nativeElement.click();
      fixture.whenStable().then(() => {
            expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
      });
    });

    it('should send accurate data to CUSTOMER popover', () => {
      let addressData = new Address(),
          customerData = new Customer();
      addressData.id = 1;
      addressData.name = 'Main Office';
      addressData.streetAddress = '14701 Charlson Road, United States';
      addressData.city = 'Eden Prairie';
      addressData.phone = '(925) 937-8500';
      addressData.state = 'MN';
      addressData.zip = '55347';
      addressData.lat = 40.795675;
      addressData.lng = -73.93600099999998;

      customerData.id = 1;
      customerData.mc = '384859';
      customerData.addresses = [addressData, addressData];
      customerData.name = 'CH ROBINSON COMPANY INC';
      customerData.contacts = [null];
      customerData.email = 'carrier.services@chrobinson.com';
      customerData.status = null;
      customerData.type = null;

      component.load = testLoad;
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(CustomerPopoverComponent)).componentInstance;

      fixture.whenStable().then(() => {
          expect(element.customer).toEqual(customerData);
      });
    });

    it('should send accurate data to DRIVER popover', () => {
      let driverData = new Driver();
      driverData.id = 1;
      driverData.firstName = 'John';
      driverData.lastName = 'Doe';
      driverData.powerUnitAssigned = Equipment.create();
      driverData.trailerAssigned = Equipment.create();

      component.load = testLoad;
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(DriverPopoverComponent)).componentInstance;
      fixture.whenStable().then(() => {
          expect(element.driver).toEqual(driverData);
      });
    });


    it('should send accurate data to TRIP popover', () => {
      let tripData = new Trip();
      tripData.id = 1;
      tripData.number = 1212;
      tripData.truckNumber = 1010;
      tripData.trailerNumber = 1111;
      tripData.driver = new Driver();
      tripData.driver.id = 1;
      tripData.driver.firstName = 'John';
      tripData.driver.lastName = 'Doe';
      tripData.driver.powerUnitAssigned = Equipment.create();
      tripData.driver.trailerAssigned = Equipment.create();

      component.load = testLoad;
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(TripPopoverComponent)).componentInstance;
      fixture.whenStable().then(() => {
          expect(element.trip).toEqual(tripData);
      });
    });

});
