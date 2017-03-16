import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../models';

@Component({
  selector: 'equipment-assignment',
  templateUrl: './equipment-assignment.component.html',
  styleUrls: ['./equipment-assignment.component.scss'],
})
export class EquipmentAssignmentComponent {
  @Input() test: Equipment;

}


