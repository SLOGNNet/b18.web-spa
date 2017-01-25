import { Component, Input } from '@angular/core';
import { NotificationItem } from '../models';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() name: string;
  @Input() eventType: any;
  @Input() message: string;
  @Input() priority: number;
  @Input() date: string;

  get priorityText(): string {
    return NotificationItem.getPriorityText(this.priority);
  }

  get getEventTypeColor(): string {
    return NotificationItem.getEventTypeColor(this.eventType);
  }

}
