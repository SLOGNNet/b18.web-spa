import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Equipment, EquipmentStatuses, EquipmentTypes, DriverTypes } from '../../../models';
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
      return EquipmentStatuses.color(this.item.status);
    }

     itemStatusText(): string {
      return EquipmentStatuses.displayText(this.item.status);
    }

    get driverTypeText(): string {
      return DriverTypes.displayText(this.item.driver.type);
    }

    get equipmentShortTypeText(): string {
      return EquipmentTypes.displayShortText(this.item.type);
    }

    ngOnInit() {
      this.firstLetter = this.equipmentShortTypeText.charAt(0);
      this.lastLetter = this.equipmentShortTypeText.charAt(1);
    }

}
