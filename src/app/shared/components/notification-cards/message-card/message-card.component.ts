import { Component, Input, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
    selector: 'message-card',
    templateUrl: './message-card.component.html',
    styleUrls: ['./message-card.component.scss']
})
export class BdMessageCardComponent {

  @Input() private notification: Notification;
  @Input() private isClosable: boolean = false;

  @Output() private closeClicked: EventEmitter<any> = new EventEmitter();

  constructor(private ngZone: NgZone){}

  onCloseClick(event) {
    this.closeClicked.emit(event);
  }

}
