import { Component, Input } from '@angular/core';
import { Contact } from '../../../../../models';
import { BdTimeAgoPipe } from '../../../../pipes';


@Component({
    selector: 'message-notification',
    templateUrl: './message-notification.component.html',
    styleUrls: ['./message-notification.component.scss']
})
export class MessageNotificationComponent {

  @Input() private message: string = '';
  @Input() private user: Contact;
  @Input() private date: Date = new Date();
  private firstName: string;
  private lastName: string;

  ngOnChanges(){
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
  }

}
