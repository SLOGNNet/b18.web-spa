import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../models';

@Component({
  selector: 'equipment-employment',
  templateUrl: './equipment-employment.component.html',
  styleUrls: ['./equipment-employment.component.scss'],
})
export class EquipmentEmploymentComponent {
  @Input() test: Equipment;

}


