import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['../base-notification/base-notification.component.scss']
})
export class NotificationCardComponent {
  @Input() notification: Notification;
  @Input() private isClosable: boolean = false;
  @Output() private close: EventEmitter<any> = new EventEmitter();

  onClose(event) {
    this.close.emit(event);
  }
}
