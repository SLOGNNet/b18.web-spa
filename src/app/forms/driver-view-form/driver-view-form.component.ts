import { Component, Input } from '@angular/core';
import { Driver, DriverTypes, DriverPaymentTypes, Equipment, EquipmentStatuses, EquipmentModes, EquipmentTypes, License } from '../../models';
import { BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component(Object.assign({
  selector: 'driver-view-form',
  templateUrl: './driver-view-form.component.html',
  styleUrls: ['./driver-view-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class DriverViewForm extends BaseForm {
  @Input() public driver: Driver;
  public restrictionsTypes: string;
  public endorsmentsTypes: string;

  ngOnInit() {
      this.restrictionsTypes = this.driver.license.restrictions.split(' ').join(', ');
      this.endorsmentsTypes = this.driver.license.endorsments.split(' ').join(', ');
  }

  get driverType() {
    return Driver.getTypeText(this.driver.type);
  }

  equipmentStatusColor(status: EquipmentStatuses) {
    return Equipment.getStatusColor(status);
  }

  equipmentModeText(mode: EquipmentModes) {
    return Equipment.getModeText(mode);
  }

  equipmentTypeText(status: EquipmentTypes) {
    return Equipment.getTypeText(status);
  }

  get paymentTypeText() {
    return Driver.getPaymentTypeText(this.driver.paymentType);
  }

  get licenseClassText() {
    return License.getLicenseClassText(this.driver.license.class);
  }
}
