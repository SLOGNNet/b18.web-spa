import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class BdNotificationCardComponent {
  @Input() notification: Notification;
  @Input() private isClosable: boolean = false;

  @Output() private closeClicked: EventEmitter<any> = new EventEmitter();

  onCloseClick(event) {
    this.closeClicked.emit(event);
  }
}
