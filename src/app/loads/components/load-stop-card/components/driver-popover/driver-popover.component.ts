import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Driver, DriverStatuses, DriverTypes, Equipment } from '../../../../../models';

@Component({
  selector: 'driver-popover',
  templateUrl: './driver-popover.component.html',
  styleUrls: ['./driver-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverPopoverComponent {
  @Input() driver: Driver;

  get status() {
    return DriverStatuses.color(this.driver.status);
  }

  get type() {
    return DriverTypes.text(this.driver.type);
  }

  getEquipmentTypeText(type) {
    return Equipment.getTypeText(type);
  }

  getEquipmentModeText(mode) {
    return Equipment.getModeText(mode);
  }

  getEquipmentStatusText(status) {
    return Equipment.getStatusText(status);
  }
}
