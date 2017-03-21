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
  private testUser: Contact = new Contact();
  private date1: Date = new Date();
  private date2: Date = new Date();
  private date3: Date = new Date();

  private notificationTypeEnum = NotificationType;

  private testNotifications: Array<Notification> = [
    {
      id: '1',
      type: NotificationType.TASK,
      title: 'test title',
      date: new Date(),
      message: 'Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      sender: this.testUser,
      priority: 0,
      taskType: 1,
      notificationStatus: 2,
      isViewed: false
    },
    {
      id: '2',
      type: NotificationType.MESSAGE,
      title: 'test title',
      date: new Date(),
      message: 'Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      sender: this.testUser,
      priority: 1,
      taskType: 2,
      notificationStatus: 3,
      isViewed: false
    },
    {
      id: '3',
      type: NotificationType.NOTIFICATION,
      date: new Date(),
      title: 'test title',
      message: 'Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      sender: this.testUser,
      priority: 2,
      taskType: 3,
      notificationStatus: 1,
      isViewed: false
    },
    {
      id: '4',
      type: NotificationType.MESSAGE,
      date: new Date(),
      title: 'test title',
      message: 'message 4',
      sender: this.testUser,
      priority: 2,
      taskType: 4,
      notificationStatus: 1,
      isViewed: false
    }
  ];


  constructor(private notificationService: NotificationService,
              private cdr: ChangeDetectorRef,
              private authenticationService: AuthenticationService) {
    notificationService.notification.subscribe(notif => {
      this.testNotifications.push(notif);
      this.testNotifications = this.testNotifications.slice();
      this.cdr.markForCheck();
    });
    this.date2.setDate(this.date1.getDate() - 1);
    this.date3.setDate(this.date1.getDate() - 3);
  }

  ngOnInit() {
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
  }

  logout() {
    this.authenticationService.logout();
  }

}
