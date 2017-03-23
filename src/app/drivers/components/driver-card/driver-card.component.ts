import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Driver, ContactInfo, DriverStatuses, DriverTypes } from '../../../models';
import { BaseCardComponent } from '../../../base';

@Component({
  selector: 'driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: [
    './driver-card.component.scss',
    '../../../base/base-card/base-card.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverCardComponent extends BaseCardComponent {

  itemStatusColor() {
    return DriverStatuses.color(this.item.status);
  }

  itemStatusText() {
    return DriverStatuses.displayText(this.item.status);
  }

  get driverTypeText() {
    return DriverTypes.displayText(this.item.type);
  }

  get phone(): string {
    const phoneInfo = ContactInfo.getPrimaryPhone(this.item.contactInfo);
    return phoneInfo ? phoneInfo.value : '';
  }
}
