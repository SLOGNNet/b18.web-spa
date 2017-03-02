import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CompanyCardComponent } from './index';
import { hexToRgb, getRGBString } from '../../../shared/helpers';
import { SharedModule } from '../../../shared/shared.module';
import { Load, Company, Address, Contact, CompanyStatuses, CompanyTypes, LoadStatuses } from '../../../models';
import { fireMouseEvent } from '../../../shared/test/helpers/domHelper';

function createTestData() {
  let resultCompany = new Company(),
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
  testLoad.systemLoadNo = '209282402';
  testLoad.status = LoadStatuses.Completed;
  // test company
  resultCompany.name = 'CH ROBINSON COMPANY INC';
  resultCompany.addresses = [testAddress];
  resultCompany.contacts = [testContact];
  resultCompany.status = CompanyStatuses.Active;
  resultCompany.mc = '384859';
  resultCompany.loads = [testLoad];
  return resultCompany;
}


describe('CompanyCardComponent', () => {
  let fixture: ComponentFixture<CompanyCardComponent>,
    component: CompanyCardComponent,
    testCompany: Company;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        CompanyCardComponent
      ],
      imports: [
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(CompanyCardComponent);
    component = fixture.componentInstance;
    testCompany = createTestData();
    //

  }));

  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display company name', () => {
    let testCompanyName = 'CH ROBINSON COMPANY INC';
    component.company = testCompany;
    component.company.name = testCompanyName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.company-name'));
    expect(element.nativeElement.textContent).toMatch(testCompanyName);
  });

  it('should display company contacts full name', () => {
    let testContactFirstName = 'Emma', testContactLastName = 'Watson';
    component.company = testCompany;
    component.company.contacts[0].firstName = testContactFirstName;
    component.company.contacts[0].lastName = testContactLastName;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.company-contact-full-name'));
    expect(element.nativeElement.textContent).toBe(testContactFirstName + ' ' + testContactLastName);
  });

  it('should display company mc', () => {
    let testCompanyMc = '384859';
    component.company = testCompany;
    component.company.mc = testCompanyMc;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.company-mc'));
    expect(element.nativeElement.textContent).toMatch('MC# ' + testCompanyMc);
  });

  it('should display status color', () => {
    component.company = testCompany;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status')),
      companyStatusColor = hexToRgb(component.companyStatusColor);
    expect(element.nativeElement.style.backgroundColor).toBe(getRGBString(companyStatusColor));
  });

  it('should display status text color', () => {
    component.company = testCompany;
    component.statusText = true;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    let companyStatusText = hexToRgb(component.companyStatusColor);
    expect(element.nativeElement.style.color).toBe(getRGBString(companyStatusText));
  });

  it('should display load color', () => {
    let testLoadStatusColor = LoadStatuses.Completed;
    component.company = testCompany;
    component.company.loads[0].status = testLoadStatusColor;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-circle'));
    let loadStatusColor = hexToRgb(component.loadStatusColor(testLoadStatusColor));
    expect(element.nativeElement.style.backgroundColor).toBe(getRGBString(loadStatusColor));
  });

  it('status text equal null', () => {
    component.company = testCompany;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element === null).toBeTruthy();
  });

  it('should display status text', () => {
    let testCompanyStatus = CompanyStatuses.Active;
    component.company = testCompany;
    component.statusText = true;
    component.company.status = testCompanyStatus;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.status-text'));
    expect(element.nativeElement.textContent).toMatch(Company.getStatusText(testCompanyStatus));
  });

  it('should display address phone', () => {
    let testCompanyAddressPhone = '(925) 937-8500';
    component.company = testCompany;
    component.company.addresses[0].phone = testCompanyAddressPhone;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.company-address-phone'));
    expect(element.nativeElement.textContent).toBe(testCompanyAddressPhone);
  });

  it('should display crooped company name', () => {
    let testCroopedCompanyName = 'CHR';
    component.company = testCompany;
    component.company.name = 'CH ROBINSON COMPANY INC';
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.cropped-company-name'));
    expect(element.nativeElement.textContent).toBe(testCroopedCompanyName);
  });

  it('should display system load number', () => {
    let testSystemLoadNumber = '209282402';
    component.company = testCompany;
    component.company.loads[0].systemLoadNo = testSystemLoadNumber;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.load-name'));
    expect(element.nativeElement.textContent).toMatch('LD' + testSystemLoadNumber);
  });

  it('should display company contact position', () => {
    let testCompanyContactPosition = 'Sales manager';
    component.company = testCompany;
    component.company.contacts[0].position = testCompanyContactPosition;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.position'));
    expect(element.nativeElement.textContent).toMatch(testCompanyContactPosition);
  });

  it('should handle click', () => {
    component.company = testCompany;
    spyOn(component, 'onClick');
    let element = fixture.debugElement.query(By.css('.company-card-section'));
    element.nativeElement.click();
    expect(fixture.debugElement.componentInstance.onClick).toHaveBeenCalled();
  });

  it('should handle mouse leave', () => {
    component.company = testCompany;
    spyOn(component, 'onLeave').and.callThrough();
    let element = fixture.debugElement.query(By.css('.company-card-section'));
    fireMouseEvent(element.nativeElement, 'mouseleave');
    fixture.detectChanges();
    let statusTextElement = fixture.debugElement.query(By.css('.status-text'));

    expect(statusTextElement === null).toBeTruthy();
    expect(component.onLeave).toHaveBeenCalled();
  });

  it('should handle mouse enter', () => {
    component.company = testCompany;
    spyOn(component, 'onEnter').and.callThrough();
    let element = fixture.debugElement.query(By.css('.company-card-section'));
    fireMouseEvent(element.nativeElement, 'mouseenter');
    fixture.detectChanges();
    let statusTextElement = fixture.debugElement.query(By.css('.status-text'));

    expect(statusTextElement === null).toBeFalsy();
    expect(component.onEnter).toHaveBeenCalled();
  });

});
