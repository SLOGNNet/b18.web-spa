import { Component, Input } from '@angular/core';
import { Notification } from '../../../../models';

@Component({
  selector: 'notification-icon',
  styleUrls: ['./notification-icon.component.scss'],
  templateUrl: './notification-icon.component.html'
})
export class NotificationIcon {
  @Input() priority: number;
  @Input() eventType: number;

  get priorityText(): string {
    return Notification.getPriorityText(this.priority);
  }

  get getEventTypeColor(): string {
    return Notification.getEventTypeColor(this.eventType);
  }
}
