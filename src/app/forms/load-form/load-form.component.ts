import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService, ContactService } from '../../shared';
import { Load, Customer, DriverRequirments, PowerUnitTypes, TrailerTypes, Stop, StopTypes, Contact, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { chain, isUndefined } from 'lodash';


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
  private stopTypes = StopTypes;

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
      pickups: this.formBuilder.array([]),
      dropoffs: this.formBuilder.array([])
    });

    this.updateComodities();
  }

 public createStopStream(source: Observable<any>) {
   Observable
    .from(source)
    .flatMap(pickups => Observable.from(pickups))
    .filter(p => p['commodities'])
    .flatMap(p => p['commodities']);
 }

  public updateComodities() {
    const loadForm = this.loadForm;
    const pickupChangeStream = Observable
      .from(this.loadForm.controls['pickups'].valueChanges)
      .flatMap(pickups => Observable.from(pickups))
      .filter(p => p['commodities'])
      .flatMap(p => p['commodities']);

     pickupChangeStream.subscribe((pickupComodity: Commodity) => {
       const chain1 = chain;
       const dropoffStop: FormGroup = <FormGroup>chain1((<FormGroup>loadForm.controls['dropoffs']).controls)
         .flatMap( dropoff => dropoff.controls['commodities'])
         .reject(isUndefined)
         .flatMap(c => c.controls)
         .filter(c => {  return c.value.id === pickupComodity.id})
         .first();

         dropoffStop.setValue(Object.assign(
           pickupComodity,
           dropoffStop.value.dropoffNumber,
         ));
     });
    }

  public onCustomerSelect(customer: Customer) {
        this.selectedCustomer = customer;
        this.customerViewMode = ViewMode.ViewCollapsed;
      }

  private initCustomerTypeahead(customer) {
        this.customerQuery = customer && customer.name;
        this.customerSource = Observable.create((observer: any) => {
          observer.next(this.customerQuery);
        }).mergeMap((token: string) => this.customerService.search(token));
      }
}
