import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Load, LoadStatuses } from '../../../models';

@Component({
  selector: 'load-stop-card',
  templateUrl: './load-stop-card.component.html',
  styleUrls: [
    './load-stop-card.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadStopCardComponent {
  @Input() active: boolean;
  @Input() load: Load;
  @Output() select: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.active') get isActive() {
    return this.active;
  }
  public statusText: boolean = false;

  private popupWidth = 220;
  private popoverOnHover = true;
  private closeOnClickOutside = true;

  get loadStatusColor() {
    return LoadStatuses.color(this.load.status);
  }

  get loadStatusText() {
    return LoadStatuses.displayText(this.load.status);
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
