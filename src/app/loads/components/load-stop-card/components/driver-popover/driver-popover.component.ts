import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  Driver,
  DriverStatuses,
  DriverTypes,
  Equipment,
  EquipmentModes,
  EquipmentTypes,
  EquipmentStatuses } from '../../../../../models';

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
    return DriverTypes.displayText(this.driver.type);
  }

  getEquipmentTypeText(type) {
    return EquipmentTypes.displayText(type);
  }

  getEquipmentModeText(mode) {
    return EquipmentModes.displayText(mode);
  }

  getEquipmentStatusText(status) {
    return EquipmentStatuses.displayText(status);
  }
}
