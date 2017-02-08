import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Equipment } from '../../../models';

@Component({
    selector: 'equipment-cards',
    templateUrl: './equipment-cards.component.html',
    styleUrls: ['./equipment-cards.component.scss']
})
export class EquipmentCardsComponent {
  @Input() equipments: Array <Equipment>;
}
