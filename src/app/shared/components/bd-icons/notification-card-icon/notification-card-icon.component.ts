import { Component, Input } from '@angular/core';
import { Notification, NotificationStatus } from '../../../../models';

@Component({
  selector: 'notification-card-icon',
  styleUrls: ['./notification-card-icon.component.scss'],
  templateUrl: './notification-card-icon.component.html'
})
export class NotificationCardIcon {
  @Input() eventType: number;
  private isSuccess: boolean;


  ngOnInit() {
    this.updateNotificationStatus();
  }

  updateNotificationStatus() {
    if (this.eventType === NotificationStatus.Error) {
      this.isSuccess = false;
    } else {
      this.isSuccess = true;
    }
  }

  ngOnChanges(changes) {
    if (changes.type) {
      this.updateNotificationStatus();
    }
  }

  get notificationStatusColor(): string {
    return Notification.notificationStatusColor(this.eventType);
  }
}
