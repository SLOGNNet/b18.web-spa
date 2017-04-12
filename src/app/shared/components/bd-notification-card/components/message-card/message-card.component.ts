import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../../models';

@Component({
    selector: 'message-card',
    templateUrl: './message-card.component.html',
    styleUrls: [
      '../base-notification/base-notification.component.scss',
      './message-card.component.scss'
    ]
})
export class MessageCardComponent {

  @Input() private notification: Notification;
  @Input() private isClosable: boolean = false;

  @Output() private close: EventEmitter<any> = new EventEmitter();

  onClose(event) {
    this.close.emit(event);
  }

  get fullName() {
    return `${this.notification.sender.firstName} ${this.notification.sender.lastName}`;
  }

}
