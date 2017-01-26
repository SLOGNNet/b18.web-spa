import { Component, Input } from '@angular/core';
import { TaskNotification } from '../../../../models';
import { Notification } from '../../../../models';

@Component({
  selector: 'notification-icon',
  styleUrls: ['./notification-icon.component.scss'],
  templateUrl: './notification-icon.component.html'
})
export class NotificationIcon {
  @Input() priority: number;
  @Input() taskType: number;

  get priorityText(): string {
    return Notification.getPriorityText(this.priority);
  }

  get getEventTypeColor(): string {
    return Notification.getEventTypeColor(this.taskType);
  }
}
