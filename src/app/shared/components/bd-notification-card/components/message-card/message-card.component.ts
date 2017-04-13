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

  get initials() {
    return this.title.replace('(', '').split(' ').filter(v => v).reduce((previousValue, currentValue) => previousValue + currentValue[0], '');
  }

  get title() {
    return `${this.notification.sender.firstName} (${this.notification.sender.position})`;
  }

}
