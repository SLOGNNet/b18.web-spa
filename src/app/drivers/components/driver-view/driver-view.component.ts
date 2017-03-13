import { Component, Input } from '@angular/core';
import { Driver, DriverTypes, DriverPaymentTypes, Equipment, EquipmentStatuses, EquipmentModes, EquipmentTypes, License } from '../../../models';
@Component({
  selector: 'driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent {
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
