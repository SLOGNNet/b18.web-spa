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
  resultLoad.id = 1;
  resultLoad.customer = testCustomer;
  resultLoad.currentTrip = [testTrip];
  resultLoad.status = LoadStatuses.Completed;
  resultLoad.stops = [ testStop1, testStop2 ];
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
    ]});
    fixture = TestBed.createComponent(LoadStopCardComponent);
    component = fixture.componentInstance;
    testLoad = createTestData();
  }));

  it('should have a component instance', () => {
    console.log('prprpprpr');
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
    let testDate = new Date(2017, 10, 10);
    component.load = testLoad;
    component.load.stops[0].date = testDate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element.nativeElement.textContent).toMatch('10/10');
  });

  it('should display end date in right format', () => {
    let testDate = new Date(2017, 11, 11);
    component.load = testLoad;
    component.load.stops[1].date = testDate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.end-date'));
    expect(element.nativeElement.textContent).toMatch('11/11');
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
    let element = fixture.debugElement.query(By.css('.stops-container'));
    expect(element.nativeElement).toBeDefined();
  });

  it('should not display stops line when stops length is less than 1', () => {
    testLoad.stops = [];
    component.load = testLoad;
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
      component.load.customer = customerData;
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(CustomerPopoverComponent)).componentInstance;
      expect(element.customer).toEqual(customerData);
    });

    it('should send current trip\'s driver data to driver popover', () => {
      let driverData = new Driver();
      driverData.id = 1;
      driverData.firstName = 'John';
      driverData.lastName = 'Doe';
      driverData.powerUnitAssigned = Equipment.create();
      driverData.trailerAssigned = Equipment.create();

      component.load = testLoad;
      component.load.currentTrip[0].driver = driverData;
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(DriverPopoverComponent)).componentInstance;
      fixture.whenStable().then(() => {
          expect(element.driver).toEqual(driverData);
      });
    });


    it('should send current trip data to trip popover', () => {
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
      component.load.currentTrip = [];
      component.load.currentTrip.push(tripData);
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.directive(TripPopoverComponent)).componentInstance;
      expect(element.trip).toEqual(tripData);
    });
});
