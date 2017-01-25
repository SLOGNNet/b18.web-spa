import { Component, Input } from '@angular/core';

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
}
