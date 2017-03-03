import { Component, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CompanyService, BdFormBuilder, BdFormGroup, ContactService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import {
  Load, Document, Company,
  DriverRequirements, PowerUnitTypes, TrailerTypes,
  Stop, StopTypes, Contact, Commodity,
  LoadType, FreightType } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { StopActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';

@Component(Object.assign({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
}, BaseForm.metaData))
export class LoadFormComponent extends BaseForm implements OnChanges {
  driverRequirementsNames: Array<any>;
  requiredPowerUnitTypesNames: Array<any>;
  requiredTrailerTypesNames: Array<any>;
  loadTypesNames: Array<any>;
  freightTypesNames: Array<any>;
  @Input() load: Load;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @select(state => state.stops.items) stops$: Observable<Stop[]>;
  public loadForm: FormGroup;
  private pickups$: Observable<Stop[]> = this.stops$.map(list => list.filter(stop => stop.type === StopTypes.Pickup));
  private dropoffs$ = this.stops$.map(list => list.filter(stop => stop.type === StopTypes.Dropoff));

  private companySource: any[];
  private companyQuery: string = '';
  private companyViewMode: ViewMode = ViewMode.None;
  private stopTypes = StopTypes;
  private documents: Array<Document>;

  public constructor(
    private stopActions: StopActions,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private contactService: ContactService,
    elementRef: ElementRef) {
    super(elementRef);
    this.driverRequirementsNames = this.enumHelperService.getDropdownKeyValues(DriverRequirements);
    this.requiredPowerUnitTypesNames = this.enumHelperService.getDropdownKeyValues(PowerUnitTypes);
    this.requiredTrailerTypesNames = this.enumHelperService.getDropdownKeyValues(TrailerTypes);
    this.loadTypesNames = this.enumHelperService.getDropdownKeyValues(LoadType);
    this.freightTypesNames = this.enumHelperService.getDropdownKeyValues(FreightType);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.initForm();
      this.initCustomerTypeahead(this.load.customer);
    }
  }

  onCompanyRemove() {
    this.load.customer = null;
  }

  onAddNewCompany() {
    this.load.customer = Company.create();
    this.companyViewMode = ViewMode.Edit;
  }

  onCompanySave(customer: Company) {
    this.load.customer = customer;
    this.companyService.create(customer);
    this.companyViewMode = ViewMode.View;
    this.initCustomerTypeahead(customer);
  }

  onCompanyEditCancel() {
    this.load.customer = this.load.customer;
  }

  public initForm() {
    this.companyViewMode = ViewMode.ViewCollapsed;
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required],
      addressId: [this.load.addressId],
      customerBillingAddressId: [this.load.customerBillingAddressId],
      contactId: [this.load.contactId],
      driverRequirement: [this.load.driverRequirment],
      requiredPowerUnitType: [this.load.requiredPowerUnitType],
      requiredTrailerType: [this.load.requiredTrailerType],
      specialRequirments: [this.load.specialRequirments],
      pickups: this.formBuilder.array([]),
      dropoffs: this.formBuilder.array([]),
      systemLoadNo: [this.load.systemLoadNo],
      customerLoadNo: [this.load.customerLoadNo],
      type: [this.load.type],
      freightType: [this.load.freightType]
    });
  }

  public onCompanySelect(company: Company) {
   this.load.customer = company;
   this.companyViewMode = ViewMode.ViewCollapsed;
  }

  private initCustomerTypeahead(customer) {
    this.companyQuery = customer && customer.name;
    this.companySource = Observable.create((observer: any) => {
      observer.next(this.companyQuery);
    }).mergeMap((token: string) => this.companyService.search(token));
  }

  private onLoadCancel() {
    this.cancel.emit();
  }

  private onLoadSave() {
    if (this.loadForm.valid) {
      let result = this.loadForm.value;
      this.save.emit(this.loadForm.value);
    }
  }

  private onStopAdd(stop: Stop) {
    this.stopActions.add(stop);
  }

  private onStopUpdate(stop: Stop) {
    this.stopActions.update(stop);
  }

  private onStopRemove(stop: Stop) {
    this.stopActions.remove(stop);
  }
}
