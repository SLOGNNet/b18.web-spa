import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StopsLineComponent } from '.';
import { SharedModule } from '../../../shared/shared.module';
import { hexToRgb, getRGBString } from '../../../shared/helpers';
import { StopPopoverComponent } from './components';
import { Address, Stop, StopAction, StopActionTypes, StopStatuses, Facility } from '../../../models';


function createStopWithPickup(): Stop {
  const stop = new Stop();
  stop.id = '1';
  stop.stopActions = [StopAction.create(StopActionTypes.PICKUP)];
  stop.plannedArrivalAt = new Date(2017, 0, 9);
  stop.facility = Facility.create();
  stop.facility.address = new Address();
  stop.status = StopStatuses.IN_PROGRESS;
  return stop;
}

function createStopWithDropoff(): Stop {
  const stop = new Stop();
  stop.id = '2';
  stop.stopActions = [StopAction.create(StopActionTypes.DROPOFF)];
  stop.plannedArrivalAt = new Date(2017, 0, 9);
  stop.facility = Facility.create();
  stop.facility.address = new Address();
  stop.status = StopStatuses.COMPLETED;
  return stop;
}

function createCollection(): Stop[] {
  return [createStopWithPickup(), createStopWithDropoff()];
}

describe('StopsLineComponent', () => {
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
    stopCollection = createCollection();
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
    let testStopData = createStopWithPickup();
    component.stops = [testStopData, testStopData, testStopData, testStopData];
    fixture.detectChanges();
    let elements = fixture.debugElement.queryAll(By.css('.stop-icon'));
    expect(elements.length).toBe(4);
  });

  it('should have arrow up icon if it\'s pickup', () => {
    component.stops = [createStopWithPickup()];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.classList.contains('icon-pickup')).toBe(true);
  });

  it('should be green if it\'s status in progress', () => {
    component.stops = [createStopWithPickup()];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement,
        inProgressColor = hexToRgb(component.getColor(StopStatuses.IN_PROGRESS));
    expect(element.style.color).toBe(getRGBString(inProgressColor));
  });

  it('should have arrow down icon if it\'s dropoff', () => {
    component.stops = [createStopWithDropoff()];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement;
    expect(element.classList.contains('icon-dropoff')).toBe(true);
  });

  it('should be orange if it\'s status completed', () => {
    component.stops = [createStopWithDropoff()];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.stop0')).nativeElement,
        completedColor = hexToRgb(component.getColor(StopStatuses.COMPLETED));
    expect(element.style.color).toBe(getRGBString(completedColor));
  });

  it('should send stop\'s data to stop popover', () => {
    let stopData = createStopWithPickup();
    component.stops = [stopData];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.directive(StopPopoverComponent)).componentInstance;
    expect(element.stop).toEqual(stopData);
  });
});
