import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class BdTaskCardComponent {
  @Input() notification: Notification;
  @Input() private isClosable: boolean = false;
  @Input() private hadSeenNotification: boolean;

  @Output() private close: EventEmitter<any> = new EventEmitter();

  constructor(private ngZone: NgZone){}

  onCloseClick(event) {
    this.close.emit(event);
  }
}
