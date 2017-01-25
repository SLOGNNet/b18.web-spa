import { Component, Input } from '@angular/core';
import { Notification } from '../models';

@Component({
  selector: 'task-notification-card',
  templateUrl: './task-notification-card.component.html',
  styleUrls: ['./task-notification-card.component.scss']
})
export class TaskNotificationCard {
  @Input() name: string;
  @Input() eventType: any;
  @Input() message: string;
  @Input() priority: number;
  @Input() date: string;

  get priorityText(): string {
    return Notification.getPriorityText(this.priority);
  }

  get getEventTypeColor(): string {
    return Notification.getEventTypeColor(this.eventType);
  }

}
