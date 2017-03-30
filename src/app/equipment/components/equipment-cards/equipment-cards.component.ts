import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Equipment } from '../../../models';

@Component({
    selector: 'equipment-cards',
    templateUrl: './equipment-cards.component.html',
    styleUrls: ['./equipment-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCardsComponent {
  public parentHover: boolean = false;
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

  @HostListener('mouseenter') mouseover() {
   this.parentHover = true;
 };

 @HostListener('mouseleave') mouseleave() {
   this.parentHover = false;
 }
}
