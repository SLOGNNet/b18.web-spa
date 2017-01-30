import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class BdNotificationCardComponent {
  @Input() notification: Notification;
  @Input() private isClosable: boolean = false;
  @Input() private hadSeenNotification: boolean;

  @Output() private close: EventEmitter<any> = new EventEmitter();

  constructor(private ngZone: NgZone){}

  onClose(event) {
    this.close.emit(event);
  }
}
