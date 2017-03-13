import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopTypes, ContactInfo } from '../../../../../models';

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
    const phoneInfo = ContactInfo.getPrimaryPhone(this.stop.facility.contactInfo);
    return phoneInfo ? phoneInfo.value : '';
  }

}
