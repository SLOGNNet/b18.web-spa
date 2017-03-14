import { Component, Input } from '@angular/core';
import { Equipment, EquipmentModes, EquipmentTypes, EquipmentStatuses } from '../../../models';

@Component({
  selector: 'driver-equipment-associations',
  templateUrl: './driver-equipment-associations.component.html',
  styleUrls: ['./driver-equipment-associations.component.scss'],
})
export class DriverEquipmentAssociationsComponent {
  @Input() associatedEquipment: Equipment;

  equipmentModeText(mode: EquipmentModes) {
    return Equipment.getModeText(mode);
  }

  equipmentTypeText(status: EquipmentTypes) {
    return Equipment.getTypeText(status);
  }

  equipmentStatusColor(status: EquipmentStatuses) {
    return Equipment.getStatusColor(status);
  }
}
