import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Equipment,
  Driver,
  EquipmentModes,
  EquipmentVehicleOperatings,
  EquipmentTypes,
  PowerUnitTypes,
  TrailerTypes
} from '../../models';
import { FormValidationService, DriverService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class EquipmentForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() public scrollable: boolean = true;
  @Input() public submitButtonText: string = 'Save';
  @Input() public equipment: Equipment;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  currentEquipmentType: EquipmentTypes;
  equipmentForm: FormGroup;
  equipmentModes: Array<any>;
  operatingModes: Array<any>;
  equipmentTypes: Array<any>;
  powerUnitTypes: Array<any>;
  trailerTypes: Array<any>;
  drivers: Array<Driver> = [];
  berthAvailables: Array<any> = [{'key': true, 'value': 'Yes'}, {'key': false, 'value': 'No'}];

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    private driverService: DriverService,
    private enumHelperService: EnumHelperService,
    elementRef: ElementRef) {
    super(elementRef);

    this.driverService.getAll()
    .subscribe(drivers => this.drivers = drivers.map(value => value));

    this.equipmentModes = enumHelperService.getDropdownKeyValues(EquipmentModes);
    this.operatingModes = enumHelperService.getDropdownKeyValues(EquipmentVehicleOperatings);
    this.equipmentTypes = enumHelperService.getDropdownKeyValues(EquipmentTypes);
    this.powerUnitTypes = enumHelperService.getDropdownKeyValues(PowerUnitTypes);
    this.trailerTypes = enumHelperService.getDropdownKeyValues(TrailerTypes);
  }

  ngOnChanges(changes: any) {
    if (changes.disabled) {
      this.setFormDisabled(this.disabled);
    }
    if (changes.equipment) {
      this.currentEquipmentType = this.equipment.type;
      this.initForm();
    }
  }

  setFormDisabled(isDisabled) {
    if (this.equipmentForm) {
      if (isDisabled) {
        this.equipmentForm.disable();
      } else {
        this.equipmentForm.enable();
      }
    }
  }

  submit(equipment: Equipment, isValid: boolean) {

    if (!isValid) {
      this.validationService.show();
    }

    if (equipment && isValid) {
      this.equipmentForm.markAsPristine();
      this.save.emit(equipment);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  initForm() {
    this.equipmentForm = this.formBuilder.group({
      id: [this.equipment.id],
      vin: [{value: this.equipment.vin, disabled: this.disabled}],
      ownership: [{value: this.equipment.ownership, disabled: this.disabled}],
      vehicleOperating: [{value: this.equipment.vehicleOperating, disabled: this.disabled}],
      type: [{value: this.equipment.type, disabled: this.disabled}],
      subType: [{value: this.equipment.subType, disabled: this.disabled}],
      driverId: [{value: this.equipment.driverId, disabled: this.disabled}],
      make: [{value: this.equipment.make, disabled: this.disabled}],
      model: [{value: this.equipment.model, disabled: this.disabled}],
      number: [{value: this.equipment.number, disabled: this.disabled}],
      isSleeperBerthAvailable: [{value: this.equipment.isSleeperBerthAvailable, disabled: this.disabled}],
      licensePlateNumber: [{value: this.equipment.licensePlateNumber, disabled: this.disabled}],
      licensePlateState: [{value: this.equipment.licensePlateState, disabled: this.disabled}],
      licensePlateExpiration: [{value: this.equipment.licensePlateExpiration, disabled: this.disabled}],
      mileages: this.formBuilder.array([]),
      notes: [{value: this.equipment.notes, disabled: this.disabled}],
    });
  }

  changeEquipmentType(event) {
    this.currentEquipmentType = event.key;
  }

  get equipmentSubTypes(): Array<any> {
    switch (this.currentEquipmentType) {
      case EquipmentTypes.POWER_UNIT:
        return this.powerUnitTypes;
      case EquipmentTypes.TRAILER:
        return this.trailerTypes;
        default:
        return [];
    }
  }
}
