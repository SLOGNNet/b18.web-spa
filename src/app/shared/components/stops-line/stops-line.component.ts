import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopStatuses, StopActionTypes } from '../../../models';

const ICON_NAMES_MAP = {
  [StopActionTypes.PICKUP]: 'pickup',
  [StopActionTypes.DROPOFF]: 'dropoff'
};

@Component({
  selector: 'stops-line',
  templateUrl: './stops-line.component.html',
  styleUrls: ['./stops-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopsLineComponent {
  @Input() lineColor: string = 'lightGray';
  @Input() stops: Array<Stop>;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onStopSelect(selected) {
    this.select.emit(selected);
  }

  isPickupAndDropOff(stop: Stop) {
    let iconNames = [StopActionTypes.PICKUP, StopActionTypes.DROPOFF].filter(stopActionType => this.hasStatus(stop.stopActions, stopActionType))
    .map(stopActionType => ICON_NAMES_MAP[stopActionType]);
    return iconNames ? ['icon', ...iconNames].join('-') : '';
  }

  getColor(stopStatus: StopStatuses) {
    return StopStatuses.color(stopStatus);
  }

  hasStatus(stopActions, stopActionType) {
    if(stopActions) return stopActions.filter(stopAction => stopAction.type === stopActionType).length > 0;
  }
}
