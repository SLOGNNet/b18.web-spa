import { Component, Input } from '@angular/core';
import { Driver, Equipment, EquipmentModes, EquipmentTypes, EquipmentStatuses } from '../../../models';

@Component({
  selector: 'driver-equipment-associations',
  templateUrl: './driver-equipment-associations.component.html',
  styleUrls: ['./driver-equipment-associations.component.scss'],
})
export class DriverEquipmentAssociationsComponent {
  @Input() associatedEquipment: Equipment;
  @Input() driver: Driver;

  equipmentModeText(mode: EquipmentModes) {
    return Equipment.getModeText(mode);
  }

  equipmentTypeText(status: EquipmentTypes) {
    return Equipment.getTypeText(status);
  }

  equipmentStatusColor(status: EquipmentStatuses) {
    return Equipment.getStatusColor(status);
  }

  get paymentTypeText() {
    return Driver.getPaymentTypeText(this.driver.paymentType);
  }
}
