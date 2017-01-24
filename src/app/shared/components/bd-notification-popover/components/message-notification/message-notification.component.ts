import { Component, Input } from '@angular/core';
import { Contact } from '../../../../../models';
import * as moment from 'moment';

@Component({
    selector: 'message-notification',
    templateUrl: './message-notification.component.html',
    styleUrls: ['./message-notification.component.scss']
})
export class MessageNotificationComponent {


  @Input() private message: string = '';
  @Input() private user: Contact;
  @Input() private date: string = moment(new Date()).format('MM/DD/YYYY');
  private firstName: string;
  private lastName: string;

  ngOnChanges(){
    this.firstName  = this.user.firstName;
    this.lastName  = this.user.lastName;
  }

}
