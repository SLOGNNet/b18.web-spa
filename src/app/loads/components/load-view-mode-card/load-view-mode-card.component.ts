import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Stop, ContactInfo, TripStop, Address, StopActionTypes } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent } from '../../../forms';
import MockData from '../../../shared/services/data-services/mock-data';
import { find, map } from 'lodash';

@Component({
  selector: 'load-view-mode-card',
  templateUrl: './load-view-mode-card.component.html',
  styleUrls: ['./load-view-mode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewModeCardComponent {

  @Input() private load: Load = MockData.loads[0];
  @Input() stop: Stop = this.load.stops[0];

}
