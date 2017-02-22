import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { createGenericTestComponent } from '../../../shared/test/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CustomerCardComponent } from './index';
import { SharedModule } from '../../../shared/shared.module';
import { Load, Customer, Address, Contact, CustomerStatuses, CustomerTypes, LoadStatuses } from '../../../models';


function createTestData() {
  let resultCustomer = new Customer(),
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
  resultCustomer.name = 'CH ROBINSON COMPANY INC';
  resultCustomer.addresses = [testAddress];
  resultCustomer.contacts = [testContact];
  resultCustomer.status = CustomerStatuses.Active;
  resultCustomer.mc = '384859';
  resultCustomer.loads = [testLoad];
  return resultCustomer;
}


fdescribe('CustomerCardComponent', () => {
  let fixture: ComponentFixture<CustomerCardComponent>,
    component: CustomerCardComponent,
    testCustomer: Customer;

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
    testCustomer = createTestData();
    //

  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer name', () => {
    let testCustomerName = 'CH ROBINSON COMPANY INC';
    component.customer = testCustomer;
    component.customer.name = testCustomerName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-name'));
    expect(element.nativeElement.textContent).toMatch(testCustomerName);
  });

  it('should display customer contacts full name', () => {
    let testContactFirstName = 'Emma', testContactLastName = 'Watson';
    component.customer = testCustomer;
    component.customer.contacts[0].firstName = testContactFirstName;
    component.customer.contacts[0].lastName = testContactLastName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-contacts-full-name'));
    expect(element.nativeElement.textContent).toBe(testContactFirstName + ' ' + testContactLastName);
  });

  it('should display customer mc', () => {
    let testCustomerMc = '384859';
    component.customer = testCustomer;
    component.customer.mc = testCustomerMc;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-mc'));
    expect(element.nativeElement.textContent).toMatch(testCustomerMc);
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
    let testCustomerAddressPhone = '(925) 937-8500';
    component.customer = testCustomer;
    component.customer.addresses[0].phone = testCustomerAddressPhone;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-address-phone'));
    expect(element.nativeElement.textContent).toBe(testCustomerAddressPhone);
  });

  it('should display right crooped customer name', () => {
    let testCroopedCustomerName = 'CHR';
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.crooped-customer-name'));
    expect(element.nativeElement.textContent).toBe(testCroopedCustomerName);
  });

  it('should display system load number', () => {
    let testStystemLoadNumber = 209282402;
    component.customer = testCustomer;
    component.customer.loads[0].systemLoadNumber = testStystemLoadNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-name'));
    expect(element.nativeElement.textContent).toMatch('LD' + testStystemLoadNumber);
  });

  it('should display customer contact position', () => {
    let testCustomerContactPosition = 'Sales manager';
    component.customer = testCustomer;
    component.customer.contacts[0].position = testCustomerContactPosition;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.position'));
    expect(element.nativeElement.textContent).toMatch(testCustomerContactPosition);
  });

  it('should handle click', () => {
   component.customer = testCustomer;
   spyOn(component, 'onClick');
   let element = fixture.debugElement.query(By.css('.customer-card-section'));
   element.nativeElement.click();
   expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
 });
});
