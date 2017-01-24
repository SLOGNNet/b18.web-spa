import { Component, Input } from '@angular/core';
import { Contact } from '../../../../../models';
import * as moment from 'moment';

@Component({
    selector: 'message-notification',
    templateUrl: './message-notification.component.html',
    styleUrls: ['./message-notification.component.scss']
})
export class MessageNotificationComponent {

  @Input() message: string = '';
  @Input() user: Contact;

  @Input() date: string = moment(new Date()).format('MM/DD/YYYY');

}
