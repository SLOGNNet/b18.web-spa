import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadStopCardComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load, LoadStatuses, Customer, Trip, Driver, Address, Equipment, Stop, StopTypes, StopStatuses, Facility } from '../../../models';


function createTestData() {
  let resultLoad = new Load(),
      testTrip = new Trip(),
      testDriver = new Driver(),
      testAddress = new Address(),
      testCustomer = new Customer(),
      testStop1 = new Stop(),
      testStop2 = new Stop();
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
  testStop1.type = StopTypes.Pickup;
  testStop1.address = testAddress;
  testStop1.date = new Date(2017, 0, 9);
  testStop1.facility = Facility.create();
  testStop1.status = StopStatuses.InProgress;
  testStop2.id = 2;
  testStop2.type = StopTypes.Pickup;
  testStop2.address = testAddress;
  testStop2.date = new Date(2017, 1, 10);
  testStop2.facility = Facility.create();
  testStop2.status = StopStatuses.InProgress;
  // test load
  resultLoad.id = 1;
  resultLoad.customer = testCustomer;
  resultLoad.currentTrip = [testTrip];
  resultLoad.status = LoadStatuses.Completed;
  resultLoad.stops = [testStop1, testStop2];
  return resultLoad;
}

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
      ]
    });
    fixture = TestBed.createComponent(LoadStopCardComponent);
    component = fixture.componentInstance;
    testLoad = createTestData();
  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display load number', () => {
    let testLoadNumber = 100500;
    component.load = testLoad;
    component.load.systemLoadNumber = testLoadNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-number'));
    expect(element.nativeElement.textContent).toMatch('LD' + testLoadNumber);
  });

  it('should display customer load number', () => {
    let testCustomerNumber = 100200;
    component.load = testLoad;
    component.load.customerLoadNumber = testCustomerNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-load-number'));
    expect(element.nativeElement.textContent).toEqual(String(testCustomerNumber));
  });

  it('should display driver firstname', () => {
    let testDriverName = 'Isaak';
    component.load = testLoad;
    component.load.currentTrip[0].driver.firstName = testDriverName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstName'));
    expect(element.nativeElement.textContent).toMatch(testDriverName);
  });

  it('should display truck number', () => {
    let testTruckNumber = 2017;
    component.load = testLoad;
    component.load.currentTrip[0].truckNumber = testTruckNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.truckNumber'));
    expect(element.nativeElement.textContent).toMatch('Tk' + testTruckNumber);
  });

  it('should display trailer number', () => {
    let testTrailerNumber = 7102;
    component.load = testLoad;
    component.load.currentTrip[0].trailerNumber = testTrailerNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.trailerNumber'));
    expect(element.nativeElement.textContent).toMatch('TI' + testTrailerNumber);
  });

  it('should display trip number', () => {
    let testTripNumber = 4038;
    component.load = testLoad;
    component.load.currentTrip[0].number = testTripNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.tripNumber'));
    expect(element.nativeElement.textContent).toMatch('TR' + testTripNumber);
  });

  it('should display start date in right format', () => {
    let testStartdate = new Date(2017, 7, 10);
    component.load = testLoad;
    component.load.stops[0].date = testStartdate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element.nativeElement.textContent).toMatch('08/10');
  });

  it('should display end date in right format', () => {
    let testEndDate = new Date(2017, 5, 9);
    component.load = testLoad;
    component.load.stops[1].date = testEndDate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.end-date'));
    expect(element.nativeElement.textContent).toMatch('06/09');
  });

  it('should display load status text', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status'));
    expect(element.nativeElement.textContent).toMatch(Load.getStatusText(LoadStatuses.Completed));
  });

  it('should display load status color', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status'));
    expect(element.nativeElement.getAttribute('style')).toContain('background-color: rgb(133, 209, 131)');
  });

  it('should display stops line when stops length is greater than 1', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stops-container'));
    expect(element).toBeDefined();
  });

  it('should not display stops line when stops length is less than 2', () => {
    component.load = testLoad;
    component.load.stops = [testLoad.stops[0]];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stops-container'));
    expect(element === null).toBeTruthy();
  });

  it('should display right address of first stop in load', () => {
    let testCity = 'New York', testState = 'AL';
    component.load = testLoad;
    component.load.stops[0].address.city = testCity;
    component.load.stops[0].address.state = testState;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstStopAddress'));
    expect(element.nativeElement.textContent).toMatch(testCity + ', ' + testState);
  });

  it('should display right address of last stop in load', () => {
    let testCity = 'Eden Prairie', testState = 'AL';
    component.load = testLoad;
    component.load.stops[1].address.city = testCity;
    component.load.stops[1].address.state = testState;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.lastStopAddress'));
    expect(element.nativeElement.textContent).toMatch(testCity + ', ' + testState);
  });

  it('should handle click', () => {
    component.load = testLoad;
    spyOn(component, 'onClick');
    let element = fixture.debugElement.query(By.css('.load-stop-card-section'));
    element.nativeElement.click();
    expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
  });

  it('should send customer\'s data to customer popover', () => {
    let addressData = new Address(),
      customerData = Customer.create();
    customerData.addresses = [addressData, addressData];
    component.load = testLoad;
    component.load.customer = customerData;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(CustomerPopoverComponent)).componentInstance;
    expect(element.customer).toEqual(customerData);
  });

  it('should send current trip\'s driver data to driver popover', () => {
    let driverData = Driver.create();
    component.load = testLoad;
    component.load.currentTrip[0].driver = driverData;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(DriverPopoverComponent)).componentInstance;
    fixture.whenStable().then(() => {
      expect(element.driver).toEqual(driverData);
    });
  });

  it('should send current trip data to trip popover', () => {
    let tripData = Trip.create();
    component.load = testLoad;
    component.load.currentTrip = [tripData];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(TripPopoverComponent)).componentInstance;
    expect(element.trip).toEqual(tripData);
  });
});
