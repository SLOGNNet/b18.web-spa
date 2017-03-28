import { Component, Input } from '@angular/core';
import { Equipment, EquipmentModes, EquipmentTypes, EquipmentStatuses } from '../../../../../models';

@Component({
  selector: 'driver-equipment-associations',
  templateUrl: './driver-equipment-associations.component.html',
  styleUrls: ['./driver-equipment-associations.component.scss'],
})
export class DriverEquipmentAssociationsComponent {
  @Input() associatedEquipment: Equipment;

  equipmentModeText(mode: EquipmentModes) {
    return EquipmentModes.displayText(mode);
  }

  equipmentTypeText(status: EquipmentTypes) {
    return EquipmentTypes.displayText(status);
  }

  equipmentStatusColor(status: EquipmentStatuses) {
    return EquipmentStatuses.color(status);
  }
}
