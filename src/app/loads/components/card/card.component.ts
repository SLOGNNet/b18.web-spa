import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Load } from '../../../models';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() load: Load;
  @Output() select: EventEmitter<any> = new EventEmitter();

  get loadStatusColor() {
    return Load.getStatusColor(this.load.status);
  }

  get loadStatusText() {
    return Load.getStatusText(this.load.status);
  }

  get firstStop() {
    return this.load.stops[0];
  }

  get lastStop() {
    return this.load.stops[this.load.stops.length - 1];
  }

  onClick() {
    this.select.emit(this.load);
  }
}
