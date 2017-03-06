import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Trip } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripViewComponent {
  @Input() trip: Trip;
  @Input() isExpanded: boolean = false;
}
