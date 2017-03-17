import { Component, Input } from '@angular/core';
import { Equipment, Driver, ContactInfo } from '../../../../../models';

@Component({
  selector: 'equipment-assignment',
  templateUrl: './equipment-assignment.component.html',
  styleUrls: ['./equipment-assignment.component.scss'],
})
export class EquipmentAssignmentComponent {
  @Input() equipment: Equipment;

  get driverType() {
    return Driver.getTypeText(this.equipment.driver.type);
  }

  get driverStatusColor() {
    return Driver.getStatusColor(this.equipment.driver.status);
  }

  get primaryPhone() {
    return ContactInfo.getPrimaryPhone(this.equipment.driver.contactInfo);
  }
}
