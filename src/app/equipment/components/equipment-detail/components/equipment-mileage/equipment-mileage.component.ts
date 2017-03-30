import { Component, Input } from '@angular/core';
import { Mileage } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'equipment-mileage',
  templateUrl: './equipment-mileage.component.html',
  styleUrls: ['./equipment-mileage.component.scss'],
})
export class EquipmentMileageComponent {
  @Input() mileage: Mileage;

  constructor(private constants: Constants) {}
}
