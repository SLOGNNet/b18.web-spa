import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
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

  constructor(private ngZone: NgZone){}

  onCloseClick(event) {
    this.close.emit(event);
  }
}
