import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Equipment } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { BaseCardComponent } from '../../../base';

@Component({
  selector: 'equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: [
    './equipment-card.component.scss',
    '../../../base/base-card/base-card.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCardComponent extends BaseCardComponent {
    public firstLetter: string;
    public lastLetter: string;

    itemStatusColor(): string {
      return Equipment.getStatusColor(this.item.status);
    }

     itemStatusText(): string {
      return Equipment.getStatusText(this.item.status);
    }

    get equipmentTypeText(): string {
      return Equipment.getDriverText(this.item.driverType);
    }

    get equipmentShortTypeText(): string {
      return Equipment.getShortTypeText(this.item.type);
    }

    ngOnInit() {
      this.firstLetter = this.equipmentShortTypeText.charAt(0);
      this.lastLetter = this.equipmentShortTypeText.charAt(1);
    }

}
