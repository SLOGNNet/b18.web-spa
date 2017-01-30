import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
    selector: 'message-card',
    templateUrl: './message-card.component.html',
    styleUrls: ['./message-card.component.scss']
})
export class BdMessageCardComponent {

  @Input() private notification: Notification;
  @Input() private isClosable: boolean = false;
  @Input() private hadSeenNotification: boolean;

  @Output() private close: EventEmitter<any> = new EventEmitter();

  onClose(event) {
    this.close.emit(event);
  }

}
