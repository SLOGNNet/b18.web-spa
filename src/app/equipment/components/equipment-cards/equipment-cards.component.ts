import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseCardListComponent } from '../../../base';

@Component({
    selector: 'equipment-cards',
    templateUrl: './equipment-cards.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCardsComponent extends BaseCardListComponent {
  @Input() equipments: Array <Equipment>;
  @Input() selected: Array<Equipment> = [];
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.select.emit({selected: [item]});
  }

  isActive(id) {
    const selected = this.selected.find(i => {
      return i.id === id;
    });

    return selected;
  }
}
