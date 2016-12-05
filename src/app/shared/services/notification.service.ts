import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { URLSearchParams } from '@angular/http';
import { SocketService } from './socket.service';

@Injectable()
export class NotificationService {
    private notificationObservable: Observable<any>;

    constructor(private socketService: SocketService) {

    }

  get(): Observable<any> {
    if (!this.notificationObservable) {
      const roomId = this.getUserRoomId();
      this.notificationObservable = this.socketService.getSocketObservable('/notifications', roomId);
    };
    return this.notificationObservable;
  }
    private getUserRoomId(): string {
        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.paramsMap.get('?userId');
        const userId = userIdParam ? userIdParam[0] : '1';
        return userId;
    }

}
