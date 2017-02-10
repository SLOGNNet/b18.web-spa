import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Equipment } from '../../../models';

@Component({
    selector: 'equipment-cards',
    templateUrl: './equipment-cards.component.html',
    styleUrls: ['./equipment-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCardsComponent {
  @Input() equipments: Array <Equipment>;
}
