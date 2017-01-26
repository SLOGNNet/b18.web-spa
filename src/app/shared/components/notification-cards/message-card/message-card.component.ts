import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification, Contact } from '../../../../models';

@Component({
    selector: 'message-card',
    templateUrl: './message-card.component.html',
    styleUrls: ['./message-card.component.scss']
})
export class BdMessageCardComponent {

  @Input() private message: string = '';
  @Input() private date: Date = new Date();
  @Input() private isClosable: boolean = false;
  @Input() private sender: Contact = new Contact();
  private firstName: string = 'test name';
  private lastName: string = 'test lastname';

  @Output() private closeClicked: EventEmitter<any> = new EventEmitter();

  onCloseClick(event) {
    this.closeClicked.emit(event);
  }

}
