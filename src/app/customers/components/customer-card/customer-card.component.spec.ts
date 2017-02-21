import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { createGenericTestComponent } from '../../../shared/test/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CustomerCardComponent } from './index';
import { SharedModule } from '../../../shared/shared.module';
import { Load, Customer, Address, Contact, CustomerStatuses, CustomerTypes, LoadStatuses } from '../../../models';



const mockCustomer = new Customer(),
  testContact = new Contact(),
  testCustomer = new Customer(),
  testLoad = new Load(),
  testAddress = new Address();

// test address
  testAddress.phone = '(925) 937-8500',

  // test contact
  testContact.firstName = 'Emma',
  testContact.lastName = 'Watson',
  testContact.position = 'Sales manager',
  // test load
  testLoad.systemLoadNumber = 209282402,
  testLoad.status = LoadStatuses.Booked,
  // test customer
  mockCustomer.name = 'CH ROBINSON COMPANY INC',
  mockCustomer.addresses = [testAddress],
  mockCustomer.contacts = [testContact],
  mockCustomer.email = 'carrier.services@chrobinson.com',
  mockCustomer.status = CustomerStatuses.Active,
  mockCustomer.mc = '384859',
  mockCustomer.loads = [testLoad];


fdescribe('CustomerCardComponent', () => {
  let fixture: ComponentFixture<CustomerCardComponent>,
    component: CustomerCardComponent,
    testCustomer: Customer = mockCustomer;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerCardComponent
      ],
      imports: [
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    //

  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer name', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-name'));
    expect(element.nativeElement.textContent).toMatch('CH ROBINSON COMPANY INC');
  });

  it('should display customer mc', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-mc'));
    expect(element.nativeElement.textContent).toMatch('384859');
  });

  it('should display customer contact position', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.position'));
    expect(element.nativeElement.textContent).toMatch('Sales manager');
  });

  it('should handle click', async(() => {
    component.customer = testCustomer;
    spyOn(component, 'onClick');

    let element = fixture.debugElement.query(By.css('.customer-card-section'));
    element.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
    });
  }));
});
