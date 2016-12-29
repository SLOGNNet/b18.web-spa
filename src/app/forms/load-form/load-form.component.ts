import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService, ContactService } from '../../shared';
import { Load, Customer, DriverRequirments, PowerUnitTypes, TrailerTypes, Stop, StopTypes, Contact, Commodity } from '../../models';
import { CommodityStore } from '../../stores';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { flatMap } from 'lodash';


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
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  private customerSource: any[];
  private customerQuery: string = '';
  private customerViewMode: ViewMode = ViewMode.None;
  private loadForm: FormGroup;
  private stopTypes = StopTypes;
  private anchors = [{
    id: 'customer',
    title: 'Customer'
  }, {
    id: 'pickups',
    title: 'Pickups'
  },
  {
   id: 'dropoffs',
   title: 'Dropoffs'
  },
  {
    id: 'requirements',
    title: 'Requirements'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }];

  public constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private commodityStore: CommodityStore,
    private contactService: ContactService) {
    super();
    this.driverRequirmentsNames = this.enumHelperService.getDropdownKeyValues(DriverRequirments);
    this.powerUnitTypesNames = this.enumHelperService.getDropdownKeyValues(PowerUnitTypes);
    this.trailerTypesNames = this.enumHelperService.getDropdownKeyValues(TrailerTypes);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.commodityStore.set(
        flatMap(this.load.pickups, p => p.commodities),
        flatMap(this.load.dropoffs, d => d.commodities));
      this.initForm();
      this.initCustomerTypeahead(this.load.customer);
    }
  }

  onCustomerRemove() {
    this.load.customer = null;
  }

  onAddNewCustomer() {
    this.load.customer = Customer.create();
    this.customerViewMode = ViewMode.Edit;
  }

  onCustomerSave(customer: Customer) {
    this.load.customer = customer;
    this.customerService.create(customer);
    this.customerViewMode = ViewMode.View;
    this.initCustomerTypeahead(customer);
  }

  onCustomerEditCancel() {
    this.load.customer = this.load.customer;
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
  }

  public onCustomerSelect(customer: Customer) {
   this.load.customer = customer;
   this.customerViewMode = ViewMode.ViewCollapsed;
  }

  private initCustomerTypeahead(customer) {
    this.customerQuery = customer && customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }

  private onLoadCancel() {
    this.cancel.emit();
  }

  private onLoadSave() {
    if (this.loadForm.valid) {
      this.save.emit(this.loadForm.value);
    }
  }
}
