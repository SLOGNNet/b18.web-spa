import { Component, Input } from '@angular/core';
import { NotificationCard } from '../models';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {
  @Input() notification: NotificationCard;
}
