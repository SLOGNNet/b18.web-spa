import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StopAction, StopActionTypes } from '../../../../../models';
import { filter } from 'lodash';

@Component({
  selector: 'stop-actions',
  templateUrl: './stop-actions.component.html',
  styleUrls: ['./stop-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopActionsComponent {
  @Input() stopActions: Array<StopAction>;

  public commodityHeaders = [
      { name: 'NUMBER' },
      { name: 'P.O.' },
      { name: 'COMMO-<br />DITY' },
      { name: 'UNIT<br />TYPE' },
      { name: 'UNIT<br />COUNT' },
      { name: 'PALLET<br />COUNT' },
      { name: 'WEIGHT<br />(IBS)' }
    ];

  getStopActionClass(stopAction: StopAction) {
    const classes = { [StopActionTypes.PICKUP]: 'pickup-border', [StopActionTypes.DROPOFF]: 'dropoff-border'};
    return classes[stopAction.type] || '';
  }
}
