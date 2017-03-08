import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Driver, ContactInfo } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
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
    return Driver.getStatusColor(this.item.status);
  }

  itemStatusText() {
    return Driver.getStatusText(this.item.status);
  }

  get driverTypeText() {
    return Driver.getTypeText(this.item.type);
  }

  get phone(): string {
    return ContactInfo.getPrimaryPhone(this.item.contactInfo);
  }
}
