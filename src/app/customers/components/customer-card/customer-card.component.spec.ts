import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input, Output, EventEmitter, Directive } from '@angular/core';
import { CustomerCardComponent } from './index';


describe('customer-card', () => {

  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;
  let de: DebugElement;

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

});
