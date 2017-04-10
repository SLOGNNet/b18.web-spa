import { Component, Input } from '@angular/core';
import { Equipment, EquipmentTypes } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss'],
})
export class EquipmentDetailsComponent {
  @Input() equipment: Equipment;

  constructor(private constants: Constants) {}

  get isSleeperBerthAvailable() {
    return this.equipment.isSleeperBerthAvailable ? 'Yes' : 'No';
  }

  get shortTypeText() {
    return EquipmentTypes.displayShortText(this.equipment.type).split('').join(' ');
  }
}
