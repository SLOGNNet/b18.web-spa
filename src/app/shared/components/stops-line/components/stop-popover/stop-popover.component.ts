import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopTypes } from '../../../../../models';

@Component({
  selector: 'stop-popover',
  templateUrl: './stop-popover.component.html',
  styleUrls: ['./stop-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopPopoverComponent {
  @Input() stop: Stop;

  get statusText() {
    return Stop.getStatusText(this.stop.status);
  }

  get typeText() {
    return Stop.getTypeText(this.stop.type);
  }

  get phone() {
    // return [this.stop.facility.address.phone, this.stop.facility.address.phoneExtension].filter(v => v).join(' x ');
    return 'TODO';
  }

}
