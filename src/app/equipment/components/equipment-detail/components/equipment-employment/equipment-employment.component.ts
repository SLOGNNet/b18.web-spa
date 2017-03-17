import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../models';

@Component({
  selector: 'equipment-employment',
  templateUrl: './equipment-employment.component.html',
  styleUrls: ['./equipment-employment.component.scss'],
})
export class EquipmentEmploymentComponent {
  @Input() equipment: Equipment;

  get equipmentOwnership() {
    return Equipment.getModeText(this.equipment.ownership);
  }

  get equipmentType() {
    return Equipment.getTypeText(this.equipment.type);
  }

  get equipmentSubType() {
    return Equipment.getEquipmentSubType(this.equipment.type, this.equipment.subType);
  }

  get vehicleOperating() {
    return Equipment.getVehicleOperatingsType(this.equipment.vehicleOperating);
  }
}
