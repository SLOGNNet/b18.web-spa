import { Component, Input } from '@angular/core';
import { TaskNotification } from '../../../../models';
import { Notification } from '../../../../models';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class BdTaskCardComponent {
  @Input() notification: Notification;
}
