import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Load } from '../../../models';
import { includes } from 'lodash';

@Component({
    selector: 'load-stop-cards',
    templateUrl: './load-stop-cards.component.html',
    styleUrls: ['./load-stop-cards.component.scss']
})
export class LoadStopCardsComponent {
  @Input()loads: Array<Load>;
  @Input()selected: Array<Load> = [];
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.selected = [item];
    this.select.emit({selected: [item]});
  }

  isActive(id) {
    const selectedIds: Array<number> = this.selected.map(i => {
      return i.id;
    });

    return includes(selectedIds, id);
  }
}
