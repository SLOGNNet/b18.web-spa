import { Component, Input, Output, OnChanges, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CompanyService, ContactService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import {
  Load, Document, Company,
  DriverRequirements, PowerUnitTypes, TrailerTypes,
  Stop, StopTypes, LoadType, FreightType, ReeferType
} from '../../models';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { StopActions } from '../../actions';
import { select } from '@angular-redux/store';

@Component(Object.assign({
  selector: 'load-info-form',
  styleUrls: ['load-info-form.component.scss'],
  templateUrl: './load-info-form.component.html',
  changeDetectionStrategy: ChangeDetectionStrategy.OnPush
}, BaseForm.metaData))
export class LoadInfoFormComponent extends BaseForm implements OnChanges {
  driverRequirementsNames: Array<any>;
  requiredPowerUnitTypesNames: Array<any>;
  requiredTrailerTypesNames: Array<any>;
  loadTypesNames: Array<any>;
  freightTypesNames: Array<any>;
  reeferTypesNames: Array<any>;
  isReefer: boolean = true;
  @Input() public isLoading: boolean = false;
  @Input() load: Load;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() addCustomer: EventEmitter<any> = new EventEmitter();
  public loadForm: FormGroup = this.formBuilder.group({});
  private fields = [
    { name: 'id', validators: [] },
    { name: 'customerLoadNo', validators: [] },
    { name: 'driverRequirment', validators: [] },
    { name: 'requiredPowerUnitType', validators: [] },
    { name: 'requiredTrailerType', validators: [] },
    { name: 'specialRequirments', validators: [] },
    { name: 'type', validators: [] },
    { name: 'freightType', validators: [] },
    { name: 'reeferType', validators: [] },
    { name: 'temperature', validators: [] },
  ];

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
    this.reeferTypesNames = this.enumHelperService.getDropdownKeyValues(ReeferType);
    this.loadForm.valueChanges.subscribe(v => {
      const isReefer = v.freightType === FreightType.REEFER;

      if (isReefer !== this.isReefer) {
        this.isReefer = isReefer;
        if (!this.isReefer) {
          this.loadForm.setControl('reeferType', this.formBuilder.control({ value: null, disabled: false }));
          this.loadForm.setControl('temperature', this.formBuilder.control({ value: '', disabled: false }));
        }
      }
    });
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.initForm();
    }
  }

  public initForm() {
    this.fields.forEach(field => {
      this.loadForm.setControl(
        field.name,
        this.formBuilder.control({ value: this.load[field.name], disabled: false }, field.validators)
      );
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
