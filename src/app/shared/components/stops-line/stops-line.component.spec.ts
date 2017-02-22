import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StopsLineComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { StopPopoverComponent } from './components';
import { Address, Stop, StopTypes, StopStatuses, Facility } from '../../../models';

const testStopCollection: Array<Stop> = [];
const testStop1 = new Stop();
const testStop2 = new Stop();
const testStop3 = new Stop();

// test stops
testStop1.id = 1;
testStop1.notes = 'notes';
testStop1.type = StopTypes.Pickup;
testStop1.address = new Address();
testStop1.date = new Date(2017, 0, 9);
testStop1.facility = Facility.create();
testStop1.facility.id = 10;
testStop1.status = StopStatuses.InProgress;
testStop2.id = 2;
testStop2.notes = 'notes';
testStop2.type = StopTypes.Pickup;
testStop2.address = new Address();
testStop2.date = new Date(2017, 1, 10);
testStop2.facility = Facility.create();
testStop2.status = StopStatuses.InProgress;
testStop3.id = 3;
testStop3.notes = 'notes';
testStop3.type = StopTypes.Dropoff;
testStop3.address = new Address();
testStop3.date = new Date(2017, 2, 11);
testStop3.facility = Facility.create();
testStop3.status = StopStatuses.InProgress;
testStopCollection.push(testStop1, testStop2, testStop3);


fdescribe('StopsLineComponent', () => {
  let fixture: ComponentFixture<StopsLineComponent>,
      component: StopsLineComponent,
      stopCollection: Array<Stop>;

  beforeEach((() => {
    TestBed.configureTestingModule({
    imports: [
      SharedModule
    ]});
    fixture = TestBed.createComponent(StopsLineComponent);
    component = fixture.componentInstance;
    stopCollection = testStopCollection;
  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have expected number of stop items', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    expect(component.stops.length).toBe(3);
  });

  it('should render expected number of stop items', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    let elements = fixture.debugElement.queryAll(By.css('.stop-icon'));
    expect(elements.length).toBe(3);
  });

  it('should have arrow up icon if it\'s pickup', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.classList.contains('icon-pickup')).toBe(true);
  });

  it('should be green if it\'s pickup', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.getAttribute('style')).toContain('color: rgb(133, 209, 131)');
  });

  it('should have arrow down icon if it\'s dropoff', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop2')).nativeElement;
    expect(element.classList.contains('icon-dropoff')).toBe(true);
  });

  it('should be orange if it\'s dropoff', () => {
    component.stops = stopCollection;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop2')).nativeElement;
    expect(element.getAttribute('style')).toContain('color: rgb(255, 190, 77)');
  });

  it('should send accurate data to DRIVER popover', () => {
    let stopData = new Stop();
    stopData.id = 1;
    stopData.notes = 'notes';
    stopData.type = StopTypes.Pickup;
    stopData.address = new Address();
    stopData.date = new Date(2017, 0, 9);
    stopData.facility = Facility.create();
    stopData.facility.id = 10;
    stopData.status = StopStatuses.InProgress;

    component.stops = [testStop1];
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.directive(StopPopoverComponent)).componentInstance;
    console.log(element.stop);
    console.log(stopData);
    fixture.whenStable().then(() => {
        expect(element.stop).toEqual(stopData);
    });
  });
});
