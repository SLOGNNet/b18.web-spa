import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { URLSearchParams } from '@angular/http';
import { SocketService } from './socket.service';
import { Notification, NotificationType } from '../../models';

@Injectable()
export class NotificationService {
  private notificationObservable: Observable<any>;
  private timeoutPosition = 0;
  private timeouts = [1000, 2000, 5000, 9000, 1000, 1000, 1000, 10000, 90000, 500000];

  constructor(private socketService: SocketService) {

  }

  get(): Observable<any> {
    if (!this.notificationObservable) {
      const roomId = this.getUserRoomId();
      this.notificationObservable = this.socketService.getSocketObservable('/notifications', roomId);
      this.notificationObservable = this.generateNotification();
    };
    return this.notificationObservable;
  }

  private getUserRoomId(): string {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.paramsMap.get('?userId');
    const userId = userIdParam ? userIdParam[0] : '1';
    return userId;
  }

  private generateNotification(): Observable<Notification> {


    return Observable.create((observer: any) => {
      const me = this;

      function generate() {
        setTimeout(() => {
          generate();
          observer.next(me.getNotification());
        }, me.getRandomTimeout());
      }

      generate();

      observer.next(this.getNotification());
    });
  }

  private getNotification() {
    const notification: Notification = {
      id: new Date().getTime(),
      content: 'Lorem ipsum ' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      type: NotificationType.Error
    };

    return notification;
  }

  private getRandomTimeout() {
    if (this.timeoutPosition >= this.timeouts.length) this.timeoutPosition = 0;

    return this.timeouts[this.timeoutPosition++];
  }
}
