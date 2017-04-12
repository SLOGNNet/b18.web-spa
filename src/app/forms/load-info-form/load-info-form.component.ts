import { Component, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CompanyService, ContactService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import {
  Load, Document, Company,
  DriverRequirements, PowerUnitTypes, TrailerTypes,
  Stop, StopTypes, LoadType, FreightType } from '../../models';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { StopActions } from '../../actions';
import { select } from '@angular-redux/store';

@Component(Object.assign({
  selector: 'load-info-form',
  styleUrls: ['load-info-form.component.scss'],
  templateUrl: './load-info-form.component.html'
}, BaseForm.metaData))
export class LoadInfoFormComponent extends BaseForm implements OnChanges {
  driverRequirementsNames: Array<any>;
  requiredPowerUnitTypesNames: Array<any>;
  requiredTrailerTypesNames: Array<any>;
  loadTypesNames: Array<any>;
  freightTypesNames: Array<any>;
  @Input() public isLoading: boolean = false;
  @Input() load: Load;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @select(state => state.stops.items) stops$: Observable<Stop[]>;
  public loadForm: FormGroup;

  private companySource: any[];
  private companyQuery: string = '';
  private companyViewMode: ViewMode = ViewMode.None;
  private stopTypes = StopTypes;
  private documents: Array<Document>;

  public constructor(
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
    }
  }

  public initForm() {
    this.companyViewMode = ViewMode.ViewCollapsed;
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required],
      customerLocationId: [this.load.customerLocationId],
      customerBillingLocationId: [this.load.customerBillingLocationId],
      contactId: [this.load.contactId],
      driverRequirement: [this.load.driverRequirment],
      requiredPowerUnitType: [this.load.requiredPowerUnitType],
      requiredTrailerType: [this.load.requiredTrailerType],
      specialRequirments: [this.load.specialRequirments],
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
}
