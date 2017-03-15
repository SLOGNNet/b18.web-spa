import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Driver } from '../../../models';

@Component({
    selector: 'driver-cards',
    templateUrl: './driver-cards.component.html',
    styleUrls: ['./driver-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverCardsComponent {
  @Input() drivers: Array<Driver>;
  @Input() selected: Array<Driver> = [];
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
