import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService, ContactService } from '../../shared';
import { Load, Customer, DriverRequirments, PowerUnitTypes, TrailerTypes, Stop, Contact } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
}, BaseForm.metaData))
export class BdLoadFormComponent extends BaseForm implements OnChanges {
  driverRequirmentsNames: Array<any>;
  powerUnitTypesNames: Array<any>;
  trailerTypesNames: Array<any>;
  @Input() load: Load;
  private customerSource: any[];
  private customerQuery: string = '';
  private customerViewMode: ViewMode = ViewMode.None;
  private loadForm: FormGroup;
  private selectedCustomer: Customer;
  private stops: Array<Stop>;

  public constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private contactService: ContactService) {
    super();
    this.driverRequirmentsNames = this.enumHelperService.getDropdownKeyValues(DriverRequirments);
    this.powerUnitTypesNames = this.enumHelperService.getDropdownKeyValues(PowerUnitTypes);
    this.trailerTypesNames = this.enumHelperService.getDropdownKeyValues(TrailerTypes);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.selectedCustomer = this.load.customer;
      this.stops = this.load.stops;
      this.initForm();
      this.initCustomerTypeahead(this.selectedCustomer);
    }
  }

  onCustomerRemove() {
    this.selectedCustomer = null;
  }

  onAddNewCustomer() {
    this.selectedCustomer = Customer.create();
    this.customerViewMode = ViewMode.Edit;
  }

  onCustomerSave(customer: Customer) {
    this.selectedCustomer = customer;
    this.customerService.create(customer);
    this.customerViewMode = ViewMode.View;
    this.initCustomerTypeahead(customer);
  }

  onCustomerEditCancel() {
    this.selectedCustomer = this.load.customer;
  }

  public initForm() {
    this.customerViewMode = ViewMode.ViewCollapsed;
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required],
      addressId: [this.load.addressId],
      billingAddressId: [this.load.billingAddressId],
      contactId: [this.load.contactId],
      driverRequirment: [this.load.driverRequirment],
      powerUnitType: [this.load.powerUnitType],
      trailerType: [this.load.trailerType],
      specialRequirment: [this.load.specialRequirment],
      stops: this.formBuilder.array([{
          commoditiesGroup: this.formBuilder.group({})
      }])
    });
  }

  public onCustomerSelect(customer: Customer) {
    this.selectedCustomer = customer;
    this.customerViewMode = ViewMode.ViewCollapsed;
  }

  private initCustomerTypeahead(customer) {
    this.customerQuery =  customer && customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }

  private get stopsFormControl() {
    return this.loadForm.controls['stops'];
  }

  private getCommoditiesFormGroup(index = 0) {
    const controls = this.stopsFormControl['controls'][index];

    return controls.value.commoditiesGroup;
  }
}
