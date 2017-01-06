import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Load } from '../../../models';

@Component({
    selector: 'load-stops',
    templateUrl: './load-stops.component.html',
    styleUrls: ['./load-stops.component.scss']
})
export class LoadStopsComponent {
  @Input()loads: Array<Load>;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.select.emit({selected: [item]});
  }
}
