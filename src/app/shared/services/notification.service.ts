import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import { SocketService } from './socket.service';
import { Notification, TaskType, NotificationPriority, NotificationStatus } from '../../models';
import MockData from './data-services/mock-data';

@Injectable()
export class NotificationService {
  private timeoutPosition = 0;
  private timeouts = [1000, 2000, 5000, 9000, 1000, 1000, 1000, 10000, 90000, 500000];
  private _notification: BehaviorSubject<Notification>;
  private nextNotification = 0;
  private notificationCount = 39;

  constructor(private socketService: SocketService) {
    this._notification = <BehaviorSubject<Notification>>new BehaviorSubject(this.getNotification());
    this.generateNotification();
  }

  get notification() {
    return this._notification.asObservable();
  }

  sendNotification(title = '', message = '', status = NotificationStatus.NEW) {
    const notification: Notification = {
      id: '1',
      title,
      message,
      date: new Date(),
      type: 1,
      sender: null,
      taskType: 1,
      priority: 0,
      notificationStatus: status,
      isViewed: false
    };

    this._notification.next(notification);
  }

  private getUserRoomId(): string {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.paramsMap.get('?userId');
    const userId = userIdParam ? userIdParam[0] : '1';
    return userId;
  }

  private generateNotification() {
    const me = this;
    function generate() {
      setTimeout(() => {
        generate();
        me._notification.next(me.getNotification());
      }, me.getRandomTimeout());
    }
    if(this.nextNotification <= this.notificationCount) {
      generate();
    }
  }

  private getNotification() {
    return MockData.notifications[this.nextNotification++];
  }

  private getRandomTimeout() {
    if (this.timeoutPosition >= this.timeouts.length) this.timeoutPosition = 0;

    return this.timeouts[this.timeoutPosition++];
  }

  private getRandomNotificationType() {
    return Math.floor(Math.random() * 3);
  }
}
