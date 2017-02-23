import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CustomerCardComponent } from './index';
import { hexToRgb, getRGBString } from '../../../shared/helpers';
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
    let element = fixture.debugElement.query(By.css('.customer-contact-full-name'));
    expect(element.nativeElement.textContent).toBe(testContactFirstName + ' ' + testContactLastName);
  });

  it('should display customer mc', () => {
    let testCustomerMc = '384859';
    component.customer = testCustomer;
    component.customer.mc = testCustomerMc;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.customer-mc'));
    expect(element.nativeElement.textContent).toMatch('MC# ' + testCustomerMc);
  });

  it('should display right status color', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status')),
    customerStatusColor = hexToRgb(component.customerStatusColor);
    expect(element.nativeElement.style.backgroundColor).toBe(getRGBString(customerStatusColor));
  });

  it('should display right status text color', () => {
    component.customer = testCustomer;
    component.statusText = true;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    let customerStatusText = hexToRgb(component.customerStatusColor);
    expect(element.nativeElement.style.color).toBe(getRGBString(customerStatusText));
  });

  it('should display right load color', () => {
    let testLoadStatusColor = LoadStatuses.Completed;
    component.customer = testCustomer;
    component.customer.loads[0].status = testLoadStatusColor;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-circle'));
    let loadStatusColor = hexToRgb(component.loadStatusColor(testLoadStatusColor));
    expect(element.nativeElement.style.backgroundColor).toBe(getRGBString(loadStatusColor));
  });

  it('should display right status text if element equal null', () => {
    component.customer = testCustomer;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element === null).toBeTruthy();
  });

  it('should display right status text', () => {
    let testCustomerStatus = CustomerStatuses.Active;
    component.customer = testCustomer;
    component.statusText = true;
    component.customer.status = testCustomerStatus;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element.nativeElement.textContent).toMatch(Customer.getStatusText(testCustomerStatus));
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
    let element = fixture.debugElement.query(By.css('.cropped-customer-name'));
    expect(element.nativeElement.textContent).toBe(testCroopedCustomerName);
  });

  it('should display system load number', () => {
    let testSystemLoadNumber = 209282402;
    component.customer = testCustomer;
    component.customer.loads[0].systemLoadNumber = testSystemLoadNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-name'));
    expect(element.nativeElement.textContent).toMatch('LD' + testSystemLoadNumber);
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
