import { Component, Input } from '@angular/core';
import { Notification, NotificationPriority } from '../../../../models';

@Component({
  selector: 'notification-icon',
  styleUrls: ['./notification-icon.component.scss'],
  templateUrl: './notification-icon.component.html'
})
export class NotificationIcon {
  @Input() priority: number;
  @Input() taskType: number;

  get priorityText(): string {
    return NotificationPriority.displayText(this.priority);
  }

  get getEventTypeColor(): string {
    return Notification.getEventTypeColor(this.taskType);
  }
}
