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
  @Output() addCustomer: EventEmitter<any> = new EventEmitter();
  public loadForm: FormGroup;

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
    this.loadForm = this.formBuilder.group({
      id: [this.load.id],
      driverRequirment: [this.load.driverRequirment],
      requiredPowerUnitType: [this.load.requiredPowerUnitType],
      requiredTrailerType: [this.load.requiredTrailerType],
      specialRequirments: [this.load.specialRequirments],
      type: [this.load.type],
      freightType: [this.load.freightType]
    });
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

  private onAddCustomer() {
    this.addCustomer.emit();
  }
}
