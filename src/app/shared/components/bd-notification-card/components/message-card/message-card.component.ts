import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
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

  constructor(private ngZone: NgZone){}

  onClose(event) {
    this.close.emit(event);
  }

}
