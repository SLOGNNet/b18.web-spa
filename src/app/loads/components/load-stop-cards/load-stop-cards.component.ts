import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load } from '../../../models';
import { BaseCardListComponent } from '../../../base';

@Component({
    selector: 'load-stop-cards',
    templateUrl: './load-stop-cards.component.html',
    styleUrls: ['./load-stop-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadStopCardsComponent extends BaseCardListComponent {
  @Input()loads: Array<Load>;
  @Input()selected: Array<Load> = [];
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

  private trackBy(index: number, load: Load) {
    return load.id;
  }
}
