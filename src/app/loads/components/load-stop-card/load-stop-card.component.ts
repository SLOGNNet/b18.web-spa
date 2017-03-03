import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load } from '../../../models';

@Component({
  selector: 'load-stop-card',
  templateUrl: './load-stop-card.component.html',
  styleUrls: [
    './load-stop-card.component.scss',
    '../../../base/base-card/base-card.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadStopCardComponent {
  @Input() load: Load;
  @Output() select: EventEmitter<any> = new EventEmitter();
  public statusText: boolean = false;

  private popupWidth = 220;
  private popoverOnHover = true;
  private closeOnClickOutside = true;

  get loadStatusColor() {
    return Load.getStatusColor(this.load.status);
  }

  get loadStatusText() {
    return Load.getStatusText(this.load.status);
  }

  get currentTrip() {
    return this.load.currentTrips[0];
  }

  get firstStop() {
    return this.load.stops[0];
  }

  get lastStop() {
    return this.load.stops[this.load.stops.length - 1];
  }

  onEnter() {
    this.statusText = true;
  }

  onLeave() {
    this.statusText = false;
  }

  onClick() {
    this.select.emit(this.load);
  }
}
