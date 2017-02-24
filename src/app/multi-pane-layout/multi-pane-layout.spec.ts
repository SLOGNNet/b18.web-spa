import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppState } from '../app.service';
import { MultiPaneLayoutComponent } from './multi-pane-layout.component';

describe('MultiPaneLayoutComponent', () => {
  let appStateStub = {
    state: { switchState: 14 },

    get(prop) {
      return this.state[prop];
    },

    set(prop, val) {
      return this.state[prop] = val;
    },

    getPanesWidth() { return 0; }
  };
  let fixture: ComponentFixture<MultiPaneLayoutComponent>;
  let component: MultiPaneLayoutComponent;
  let appState: AppState;
  let paneFirst;
  let paneSecond;
  let paneThird;
  const getActivePanes = () => {
    return [paneFirst, paneSecond, paneThird].filter(pane => !pane.properties['hidden']);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiPaneLayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AppState, useValue: appStateStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPaneLayoutComponent);
    component = fixture.componentInstance;
    appState = TestBed.get(AppState);
    paneFirst = fixture.debugElement.query(By.css('.first-pane'));
    paneSecond = fixture.debugElement.query(By.css('.second-pane'));
    paneThird = fixture.debugElement.query(By.css('.third-pane'));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not have visible panes', () => {
    appState.set('switchState', 0);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(0);
  });

  it('should have only visible first pane', () => {

    appState.set('switchState', 2);
    fixture.detectChanges();
    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(1);
    expect(activePanes[0] === paneFirst).toBeTruthy();
  });

  it('should have only visible second pane', () => {
    appState.set('switchState', 4);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(1);
    expect(activePanes[0] === paneSecond).toBeTruthy();
  });

  it('should have only visible first and second panes', () => {
    appState.set('switchState', 6);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(2);
    expect(activePanes[0] === paneFirst).toBeTruthy();
    expect(activePanes[1] === paneSecond).toBeTruthy();
  });

  it('should have only visible third pane', () => {
    appState.set('switchState', 8);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(1);
    expect(activePanes[0] === paneThird).toBeTruthy();
  });

  it('should have only visible second and third panes', () => {
    appState.set('switchState', 12);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(2);
    expect(activePanes[0] === paneSecond).toBeTruthy();
    expect(activePanes[1] === paneThird).toBeTruthy();
  });

  it('should have visible all panes', () => {
    appState.set('switchState', 14);
    fixture.detectChanges();

    const activePanes = getActivePanes();
    expect(activePanes.length).toBe(3);
  });
});
