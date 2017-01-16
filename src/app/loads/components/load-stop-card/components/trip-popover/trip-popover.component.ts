import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Trip } from '../../../../../models';

@Component({
  selector: 'trip-popover',
  templateUrl: './trip-popover.component.html',
  styleUrls: ['./trip-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripPopoverComponent {
  @Input() trip: Trip;
}
