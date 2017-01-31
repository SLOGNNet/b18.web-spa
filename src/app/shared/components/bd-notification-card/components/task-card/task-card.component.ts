import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../../models';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['../base-notification/base-notification.component.scss']
})
export class TaskCardComponent {
  @Input() notification: Notification;
  @Input() private isClosable: boolean = false;

  @Output() private close: EventEmitter<any> = new EventEmitter();

  onClose(event) {
    this.close.emit(event);
  }
}
