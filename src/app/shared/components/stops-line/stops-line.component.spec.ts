import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StopsLineComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { StopPopoverComponent } from './components';
import { Address, Stop, StopTypes, StopStatuses, Facility } from '../../../models';

// test stops
function createTestData() {
  let testStopCollection: Array<Stop> = [],
      testStop1 = new Stop(),
      testStop2 = new Stop();
  testStop1.id = 1;
  testStop1.type = StopTypes.Pickup;
  testStop1.address = new Address();
  testStop1.date = new Date(2017, 0, 9);
  testStop1.facility = Facility.create();
  testStop1.facility.id = 10;
  testStop1.status = StopStatuses.InProgress;
  testStop2.id = 2;
  testStop2.type = StopTypes.Dropoff;
  testStop2.address = new Address();
  testStop2.date = new Date(2017, 1, 10);
  testStop2.facility = Facility.create();
  testStop2.status = StopStatuses.InProgress;
  testStopCollection.push(testStop1, testStop2);
  return testStopCollection;
}

fdescribe('StopsLineComponent', () => {
  let fixture: ComponentFixture<StopsLineComponent>,
    component: StopsLineComponent,
    stopCollection: Array<Stop>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(StopsLineComponent);
    component = fixture.componentInstance;
    stopCollection = createTestData();
  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have expected number of stop items', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    expect(component.stops.length).toBe(2);
  });

  it('should render expected number of stop items', () => {
    let testStopData = Stop.create(StopTypes.Pickup);
    component.stops = [testStopData, testStopData, testStopData, testStopData];
    fixture.detectChanges();
    let elements = fixture.debugElement.queryAll(By.css('.stop-icon'));
    expect(elements.length).toBe(4);
  });

  it('should have arrow up icon if it\'s pickup', () => {
    let currentStopType = StopTypes.Pickup;
    component.stops = stopCollection;
    component.stops[0].type = currentStopType;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.classList.contains('icon-pickup')).toBe(true);
  });

  it('should be green if it\'s pickup', () => {
    let currentStopType = StopTypes.Pickup;
    component.stops = stopCollection;
    component.stops[0].type = currentStopType;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.getAttribute('style')).toContain('color: ' + component.getColor(currentStopType));
  });

  it('should have arrow down icon if it\'s dropoff', () => {
    let currentStopType = StopTypes.Pickup;
    component.stops = stopCollection;
    component.stops[0].type = currentStopType;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop1')).nativeElement;
    expect(element.classList.contains('icon-dropoff')).toBe(true);
  });

  it('should be orange if it\'s dropoff', () => {
    let currentStopType = StopTypes.Dropoff;
    component.stops = stopCollection;
    component.stops[0].type = currentStopType;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop1')).nativeElement;
    expect(element.getAttribute('style')).toContain('color: ' + component.getColor(currentStopType));
  });

  it('should send stop\'s data to stop popover', () => {
    let stopData = Stop.create(StopTypes.Pickup);
    component.stops = [stopData];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(StopPopoverComponent)).componentInstance;
    expect(element.stop).toEqual(stopData);
  });
});
