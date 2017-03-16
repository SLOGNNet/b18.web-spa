import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../models';

@Component({
  selector: 'equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss'],
})
export class EquipmentDetailsComponent {
  @Input() test: Equipment;

}

