import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Equipment } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: [
    './equipment-card.component.scss',
    '../../../base/base-card/base-card.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCardComponent {
    @Input() equipment: Equipment;
    public firstLetter: string;
    public lastLetter: string;
    public statusText: boolean = false;

    get equipmentStatusColor(): string {
      return Equipment.getStatusColor(this.equipment.status);
    }

    get equipmentStatusText(): string {
      return Equipment.getStatusText(this.equipment.status);
    }

    get driverType(): string {
      return Equipment.getDriverText(this.equipment.driverType);
    }

    get equipmentShortTypeText(): string {
      return Equipment.getShortTypeText(this.equipment.type);
    }

    onEnter() {
      this.statusText = true;
    }

    onLeave() {
      this.statusText = false;
    }

    ngOnInit() {
      this.firstLetter = this.equipmentShortTypeText.charAt(0);
      this.lastLetter = this.equipmentShortTypeText.charAt(1);
    }

}
