import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { URLSearchParams } from '@angular/http';
import { SocketService } from './socket.service';
import { Notification, NotificationType } from '../../models';

@Injectable()
export class NotificationService {
  private notificationObservable: Observable<any>;

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
    const rand = Math.random() * (30000 - 2000) + 2000;
    return 2000;
  }
}
