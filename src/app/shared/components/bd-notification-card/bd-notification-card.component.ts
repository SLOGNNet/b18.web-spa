import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Notification, NotificationType } from '../../../models';

@Component({
  selector: 'bd-notification-card',
  templateUrl: './bd-notification-card.component.html'
})
export class BdNotificationCardComponent {
  @Input() notification: Notification;
  @Input() isClosable: boolean = false;
  @Input() viewed: boolean;

  @Output() close: EventEmitter<any> = new EventEmitter();

  private notificationTypeEnum = NotificationType;

  constructor(private ngZone: NgZone){}

  onCloseClick(event) {
    this.close.emit(event);
  }
}
