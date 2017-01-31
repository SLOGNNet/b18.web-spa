import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification, NotificationType } from '../../../models';

@Component({
  selector: 'bd-notification-card',
  templateUrl: './bd-notification-card.component.html'
})
export class BdNotificationCardComponent {
  @Input() notification: Notification;
  @Input() isClosable: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  private notificationTypeEnum = NotificationType;

  onCloseClick(event) {
    this.close.emit(event);
  }
}
