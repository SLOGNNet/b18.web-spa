import { Component, Input } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class BdNotificationCardComponent {
  @Input() notification: Notification;

  
}
