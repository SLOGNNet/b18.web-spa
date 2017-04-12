import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../models';
import { Notification, NotificationType } from '../models';
import { NotificationService } from '../shared';
import { AuthenticationService } from '../auth';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelComponent {

  private notificationTypeEnum = NotificationType;

  private testNotifications: Array<Notification> = [];

  constructor(private notificationService: NotificationService,
              private cdr: ChangeDetectorRef,
              private authenticationService: AuthenticationService) {
    notificationService.notification.subscribe(notif => {

      this.testNotifications.push(notif);
      this.testNotifications = this.testNotifications.slice();
      this.cdr.markForCheck();
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
