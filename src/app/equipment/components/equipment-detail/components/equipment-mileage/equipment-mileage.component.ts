import { Component, Input } from '@angular/core';
import { MileageRecord } from '../../../../../models';

@Component({
  selector: 'equipment-mileage',
  templateUrl: './equipment-mileage.component.html',
  styleUrls: ['./equipment-mileage.component.scss'],
})
export class EquipmentMileageComponent {
  @Input() mileageRecord: MileageRecord;

}
