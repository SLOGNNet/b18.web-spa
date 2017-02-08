import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Equipment } from '../../../models';

@Component({
  selector: 'equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent {
    @Input() equipment: Equipment;

    get equipmentStatusColor(): string {
      return Equipment.getStatusColor(this.equipment.status);
    }

    get equipmentStatusText(): string {
      return Equipment.getStatusText(this.equipment.status);
    }

    get driverType(): string {
      return Equipment.getDriverText(this.equipment.driverType);
    }

    get equipmentShortTypeText():string {
      return Equipment.getShortTypeText(this.equipment.type);
    }
}
