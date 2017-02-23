import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LayoutSwitchComponent } from './layout-switch.component';

fdescribe('LayoutSwitchComponent', () => {
  let fixture: ComponentFixture<LayoutSwitchComponent>;
  let component: LayoutSwitchComponent;
  let toggleFirst;
  let toggleSecond;
  let toggleThird;
  let toggleFourth;
  const getActiveToggles = () => {
    return [toggleFirst, toggleSecond, toggleThird, toggleFourth].filter(toggle => toggle.classes.active);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutSwitchComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSwitchComponent);
    component = fixture.componentInstance;

    toggleFirst = fixture.debugElement.query(By.css('.toggle-first'));
    toggleSecond = fixture.debugElement.query(By.css('.toggle-second'));
    toggleThird = fixture.debugElement.query(By.css('.toggle-third'));
    toggleFourth = fixture.debugElement.query(By.css('.toggle-fourth'));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not have active toggle', () => {
    component.switchState = 0;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(0);
  });

  it('should have only active first toggle', () => {
    component.switchState = 1;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0]).toBe(toggleFirst);
  });

  it('should have only active second toggle', () => {
    component.switchState = 2;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0]).toBe(toggleSecond);
  });

  it('should have only active third toggle', () => {
    component.switchState = 4;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0]).toBe(toggleThird);
  });

  it('should have only active fourth toggle', () => {
    component.switchState = 8;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0]).toBe(toggleFourth);
  });

  it('should have active all toggles except first', () => {
    component.switchState = 14;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(3);
    expect(toggleFirst.classes.active).toBeFalsy();
  });

  it('should have active all toggles', () => {
    component.switchState = 15;
    fixture.detectChanges();

    const activeToggles = getActiveToggles();

    expect(activeToggles.length).toBe(4);
  });
});
