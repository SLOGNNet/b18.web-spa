import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Stop, ContactInfo, StopStatuses, StopTypes } from '../../../../../models';

@Component({
  selector: 'stop-popover',
  templateUrl: './stop-popover.component.html',
  styleUrls: ['./stop-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopPopoverComponent {
  @Input() stop: Stop;

  get statusText() {
    return StopStatuses.displayText(this.stop.status);
  }

  get typeText() {
    // todo get type info from stop types
    return 'some type'; // StopTypes.displayText(this.stop.type);
  }

  get phone() {
    const phoneInfo = ContactInfo.getPrimaryPhone(this.stop.facility.contactInfo);
    return phoneInfo ? phoneInfo.value : '';
  }

}
