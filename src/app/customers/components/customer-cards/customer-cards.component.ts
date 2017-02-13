import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from '../../../models';

@Component({
    selector: 'customer-cards',
    templateUrl: './customer-cards.component.html',
    styleUrls: ['./customer-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardsComponent {
  @Input() customers: Array<Customer>;
  @Input() selected: Array<Customer> = [];
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.selected = [item];
    this.select.emit({selected: [item]});
  }

  isActive(id) {
    const selected = this.selected.find(i => {
      return i.id === id;
    });

    return selected;
  }
}
