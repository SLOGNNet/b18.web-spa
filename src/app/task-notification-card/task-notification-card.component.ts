import { Component, Input } from '@angular/core';
import { TaskNotification } from '../models';

@Component({
  selector: 'task-notification-card',
  templateUrl: './task-notification-card.component.html',
  styleUrls: ['./task-notification-card.component.scss']
})
export class TaskNotificationCard {
  @Input() notification: TaskNotification;
}
