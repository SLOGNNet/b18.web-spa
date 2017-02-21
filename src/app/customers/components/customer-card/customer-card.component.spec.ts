import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { createGenericTestComponent } from '../../../shared/test/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CustomerCardComponent } from './index';
import { SharedModule } from '../../../shared/shared.module';
import { Load, Customer, Address, Contact, CustomerStatuses, CustomerTypes, LoadStatuses } from '../../../models';



const mockCustomer = new Customer(),
  testContact = new Contact(),
  testLoad = new Load(),
  testAddress = new Address();

  // test address
  testAddress.phone = '(925) 937-8500';

  // test contact
  testContact.firstName = 'Emma';
  testContact.lastName = 'Watson';
  testContact.position = 'Sales manager';
  // test load
  testLoad.systemLoadNumber = 209282402;
  testLoad.status = LoadStatuses.Completed;
  // test customer
  mockCustomer.name = 'CH ROBINSON COMPANY INC';
  mockCustomer.addresses = [testAddress];
  mockCustomer.contacts = [testContact];
  mockCustomer.status = CustomerStatuses.Active;
  mockCustomer.mc = '384859';
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
    this.testCustomer = mockCustomer;
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

  it('should display customer contacts full name', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-contacts-full-name'));
    console.log(element);
    expect(element.nativeElement.textContent).toBe('Emma Watson');
  });

  it('should display customer mc', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-mc'));
    expect(element.nativeElement.textContent).toMatch('384859');
  });

  it('should display right status color', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status'));
    expect(element.nativeElement.getAttribute('style')).toContain('background-color: rgb(133, 209, 131)');
  });

  it('should display right status text color', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element.nativeElement.getAttribute('style')).toContain('color: rgb(133, 209, 131)');
  });

  it('should display right load color', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-circle'));
    expect(element.nativeElement.getAttribute('style')).toContain('background-color: rgb(133, 209, 131)');
  });

  it('should display right status text', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element.nativeElement.textContent).toMatch(Customer.getStatusText(CustomerStatuses.Active));
  });

  it('should display right address phone', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-address-phone'));
    expect(element.nativeElement.textContent).toBe('(925) 937-8500');
  });

  it('should display right crooped customer name', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.crooped-customer-name'));
    expect(element.nativeElement.textContent).toBe('CHR');
  });

  it('should display system load number', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-name'));
    expect(element.nativeElement.textContent).toMatch('209282402');
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
