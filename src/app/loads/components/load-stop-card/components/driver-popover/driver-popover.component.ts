import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Driver, Equipment } from '../../../../../models';

@Component({
  selector: 'driver-popover',
  templateUrl: './driver-popover.component.html',
  styleUrls: ['./driver-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverPopoverComponent {
  @Input() driver: Driver;

  get status() {
    return Driver.getStatusText(this.driver.status);
  }

  get type() {
    return Driver.getTypeText(this.driver.type);
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
