import { Component, Input } from '@angular/core';
import { Equipment, EquipmentTypes } from '../../../../../models';

@Component({
  selector: 'equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss'],
})
export class EquipmentDetailsComponent {
  @Input() equipment: Equipment;

  get isSleeperBerthAvailable() {
    return this.equipment.isSleeperBerthAvailable ? 'Yes' : 'No';
  }

  get shortTypeText() {
    return EquipmentTypes.displayShortText(this.equipment.type);
  }
}
