import { Component, Input } from '@angular/core';
import { Equipment, EquipmentModes, EquipmentTypes, EquipmentVehicleOperatings } from '../../../../../models';

@Component({
  selector: 'equipment-employment',
  templateUrl: './equipment-employment.component.html',
  styleUrls: ['./equipment-employment.component.scss'],
})
export class EquipmentEmploymentComponent {
  @Input() equipment: Equipment;

  get equipmentOwnership() {
    return EquipmentModes.displayText(this.equipment.ownership);
  }

  get equipmentType() {
    return EquipmentTypes.displayText(this.equipment.type);
  }

  get equipmentSubType() {
    return Equipment.getEquipmentSubType(this.equipment.type, this.equipment.subType);
  }

  get vehicleOperating() {
    return EquipmentVehicleOperatings.displayText(this.equipment.vehicleOperating);
  }
}
