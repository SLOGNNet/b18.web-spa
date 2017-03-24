import { Component, Input } from '@angular/core';
import { Equipment, DriverTypes, DriverStatuses, ContactInfo } from '../../../../../models';

@Component({
  selector: 'equipment-assignment',
  templateUrl: './equipment-assignment.component.html',
  styleUrls: ['./equipment-assignment.component.scss'],
})
export class EquipmentAssignmentComponent {
  @Input() equipment: Equipment;

  get driverType() {
    return DriverTypes.displayText(this.equipment.driver.type);
  }

  get driverStatusColor() {
    return DriverStatuses.color(this.equipment.driver.status);
  }

  get primaryPhone() {
    return ContactInfo.getPrimaryPhone(this.equipment.driver.contactInfo);
  }
}
