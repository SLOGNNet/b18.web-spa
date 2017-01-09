import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Load } from '../../../models';

@Component({
    selector: 'load-stop-cards',
    templateUrl: './load-stop-cards.component.html',
    styleUrls: ['./load-stop-cards.component.scss']
})
export class LoadStopCardsComponent {
  @Input()loads: Array<Load>;
  @Input()selected: Array<Load>;;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.selected = [item];
    this.select.emit({selected: [item]});
  }

  get selectedIds() {
    return this.selected.reduce((r, i) => {
      r.push(i.id);
      return r;
    }, []);
  }
}
