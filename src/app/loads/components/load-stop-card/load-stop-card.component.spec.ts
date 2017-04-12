import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadStopCardComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { StopsLineComponent } from '../../../shared/components/stops-line';
import { hexToRgb, getRGBString } from '../../../shared/helpers';
import { CompanyPopoverComponent, DriverPopoverComponent, TripPopoverComponent } from './components';
import { Load,
  LoadStatuses,
  Company,
  Contact,
  Trip,
  Driver,
  DriverTeam,
  ContactInfo,
  ContactInfoType,
  Location,
  Address,
  Equipment,
  Stop,
  StopTypes,
  StopStatuses,
  Facility } from '../../../models';


function createTestData() {
  let resultLoad = new Load(),
    testTrip = new Trip(),
    testDriver = Driver.create(),
    testAddress = new Address(),
    testCustomer = new Company(),
    testDriverTeam = new DriverTeam(),
    testLocation = new Location(),
    testContact = new Contact(),
    testStop1 = new Stop(),
    testStop2 = new Stop(),
    testContactInfo: Array<ContactInfo> = [
      {
        label: 'Primary Phone',
        value: '213123123',
        type: ContactInfoType.PHONE
      },
      {
        label: 'Alternative Phone',
        value: '12424234',
        type: ContactInfoType.PHONE
      },
      {
        label: 'Fax',
        value: 'fax@gmail.comj',
        type: ContactInfoType.FAX
      }
    ];
  testAddress.id = '1';
  testAddress.streetAddress1 = '14701 Char lson Road, United States';
  testAddress.city = 'Eden Prairie';
  testAddress.state = 'MN';
  testAddress.latitude = 40.795675;
  testAddress.longitude = -73.93600099999998;
  // test customer
  testCustomer.id = '1';
  testCustomer.mc = '384859';
  testCustomer.name = 'CH ROBINSON COMPANY INC';
  testCustomer.contacts = [null];
  testCustomer.email = 'carrier.services@chrobinson.com';
  testCustomer.status = null;
  testCustomer.type = null;
  // test driver
  testDriver.id = '1';
  testDriver.firstName = 'John';
  testDriver.lastName = 'Doe';
  // test driver team
  testDriverTeam.drivers = [testDriver];
  // test trip
  testTrip.id = '1';
  testTrip.number = '1212';
  testTrip.truck = new Equipment();
  testTrip.truck.number = '1010';
  testTrip.trailer = new Equipment();
  testTrip.trailer.number = '1111';
  testTrip.driverTeams = [testDriverTeam];
  // test stops
  testStop1.id = '1';
  testStop1.plannedArrivalAt = null;
  testStop1.facility = Facility.create();
  testStop1.facility.address = testAddress;
  testStop1.status = StopStatuses.IN_PROGRESS;
  testStop2.id = '2';
  testStop2.plannedArrivalAt = null;
  testStop2.facility = Facility.create();
  testStop2.facility.address = testAddress;
  testStop2.status = StopStatuses.IN_PROGRESS;

  // test location
  testLocation.id = '1';
  testLocation.name = 'Main Office';
  testLocation.address = testAddress;
  testLocation.contactInfo = testContactInfo;
  // test load
  resultLoad.id = '1';
  resultLoad.customer = testCustomer;
  resultLoad.customerLoadNo = '123123';
  resultLoad.customerBillingLocation = testLocation;
  resultLoad.customerLocation = testLocation;
  resultLoad.systemLoadNo = '121212';
  resultLoad.currentTrips = [testTrip];
  resultLoad.status = LoadStatuses.COMPLETED;
  resultLoad.stops = [testStop1, testStop2];
  return resultLoad;
}

describe('LoadStopCardComponent', () => {
  let fixture: ComponentFixture<LoadStopCardComponent>,
    component: LoadStopCardComponent,
    testLoad: Load;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        LoadStopCardComponent,
        CompanyPopoverComponent,
        DriverPopoverComponent,
        TripPopoverComponent
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
    let testLoadNumber = '100500';
    component.load = testLoad;
    component.load.systemLoadNo = testLoadNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-number'));
    expect(element.nativeElement.textContent).toEqual('LD' + testLoadNumber);
  });

  it('should display customer load number', () => {
    let testCustomerNumber = '100200';
    component.load = testLoad;
    component.load.customerLoadNo = testCustomerNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-load-number'));
    expect(element.nativeElement.textContent).toEqual('100200');
  });


  it('should display driver firstname', () => {
    let testDriverName = 'Isaak';
    component.load = testLoad;
    component.load.currentTrips[0].driverTeams[0].drivers[0].firstName = testDriverName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstName'));
    expect(element.nativeElement.textContent).toEqual(testDriverName);
  });

  it('should display truck number', () => {
    let testTruckNumber = '2017';
    component.load = testLoad;
    component.load.currentTrips[0].truck.number = testTruckNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.truckNumber'));
    expect(element.nativeElement.textContent).toMatch('Tk' + testTruckNumber);
  });

  it('should display trailer number', () => {
    let testTrailerNumber = '7102';
    component.load = testLoad;
    component.load.currentTrips[0].trailer.number = testTrailerNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.trailerNumber'));
    expect(element.nativeElement.textContent).toMatch('TI' + testTrailerNumber);
  });

  it('should display trip number', () => {
    let testTripNumber = '4038';
    component.load = testLoad;
    component.load.currentTrips[0].number = testTripNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.tripNumber'));
    expect(element.nativeElement.textContent).toMatch('TR' + testTripNumber);
  });

  it('should display start date in right format', () => {
    let testStartdate = new Date(2017, 10, 10);
    component.load = testLoad;
    component.load.stops[0].plannedArrivalAt = testStartdate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.start-date'));
    expect(element.nativeElement.textContent).toContain('11/10');
  });

  it('should display end date in right format', () => {
    let testEndDate = new Date(2017, 9, 10);
    component.load = testLoad;
    component.load.stops[1].plannedArrivalAt = testEndDate;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.end-date'));
    expect(element.nativeElement.textContent).toContain('10/10');
  });

  it('should display load status color', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status')),
      loadStatusColor = hexToRgb(component.loadStatusColor);
    expect(element.nativeElement.style.backgroundColor).toBe(getRGBString(loadStatusColor));
  });

  it('should display stops line when stops length is greater than 1', () => {
    component.load = testLoad;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stops-container'));
    expect(element.nativeElement).toBeDefined();
  });

  it('should not display stops line when stops length is less than 2', () => {
    component.load = testLoad;
    component.load.stops = [testLoad.stops[0]];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stops-container'));
    expect(element === null).toBeTruthy();
  });

  it('should display address of first stop', () => {
    let testCity = 'New York', testState = 'AL';
    component.load = testLoad;
    component.load.stops[0].facility.address.city = testCity;
    component.load.stops[0].facility.address.state = testState;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.firstStopAddress'));
    expect(element.nativeElement.textContent).toEqual(testCity + ', ' + testState);
  });

  it('should display address of last stop', () => {
    let testCity = 'Eden Prairie', testState = 'AL';
    component.load = testLoad;
    component.load.stops[1].facility.address.city = testCity;
    component.load.stops[1].facility.address.state = testState;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.lastStopAddress'));
    expect(element.nativeElement.textContent).toEqual(testCity + ', ' + testState);
  });

  it('should handle click', () => {
    component.load = testLoad;
    spyOn(component, 'onClick');
    let element = fixture.debugElement.query(By.css('.card-section'));
    element.nativeElement.click();
    expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
  });

  it('should send customer\'s data to customer popover', () => {
    let addressData = new Address(),
      customerData = Company.create();
    component.load = testLoad;
    component.load.customer = customerData;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(CompanyPopoverComponent)).componentInstance;
    expect(element.company).toEqual(customerData);
  });

  it('should send current trip\'s driver data to driver popover', () => {
    let driverData = Driver.create();
    component.load = testLoad;
    component.load.currentTrips[0].driverTeams[0].drivers[0] = driverData;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(DriverPopoverComponent)).componentInstance;
    fixture.whenStable().then(() => {
      expect(element.driver).toEqual(driverData);
    });
  });

  it('should send current trip data to trip popover', () => {
    let tripData = new Trip();
    let testDriverTeam = new DriverTeam();
    let testDriver = Driver.create();
    testDriverTeam.drivers = [testDriver];
      tripData.id = '1';
      tripData.number = '1212';
      tripData.truck = new Equipment();
      tripData.truck.number = '1010';
      tripData.trailer = new Equipment();
      tripData.trailer.number = '1111';
      tripData.driverTeams = [testDriverTeam];
    component.load = testLoad;
    component.load.currentTrips = [tripData, tripData];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(TripPopoverComponent)).componentInstance;
    expect(element.trip).toEqual(tripData);
  });

  it('should send load stops collection to stops-line component', () => {
    let stopData = Stop.create(),
      stopsCollection = [stopData, stopData];
    component.load = testLoad;
    component.load.stops = stopsCollection;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(StopsLineComponent)).componentInstance;
    expect(element.stops).toEqual(stopsCollection);
  });
});
