import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppState } from '../app.service';
import { MultiPaneLayoutComponent } from './multi-pane-layout.component';

fdescribe('MultiPaneLayoutComponent', () => {
  let fixture: ComponentFixture<MultiPaneLayoutComponent>;
  let component: MultiPaneLayoutComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiPaneLayoutComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [AppState]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPaneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    debugger;
    let de = fixture.debugElement.query(By.css('.first-pane'));
    expect(de.attributes['hidden']).toBeUndefined();
  });
});
