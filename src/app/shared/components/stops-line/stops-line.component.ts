import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopTypes } from '../../../models';

@Component({
  selector: 'stops-line',
  templateUrl: './stops-line.component.html',
  styleUrls: ['./stops-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopsLineComponent {
  @Input() lineColor: string = 'lightGray';
  @Input() stops: Array<any>;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onStopSelect(selected) {
    this.select.emit(selected);
  }

  isDropOff(type) {
    return type === StopTypes.Dropoff;
  }

  getColor(type) {
    return Stop.getStatusColor(type);
  }
}
