import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Notification, NotificationType } from '../models';
import { last } from 'lodash';

@Component({
  selector: 'bd-toast-manager',
  templateUrl: './bd-toast-manager.component.html',
  styleUrls: ['./bd-toast-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdToastManagerComponent {
  @Input() set notification(notification: Notification) {
      this.attachNotification(notification);
  }
  private _delay: number = 10000;
  private _maxStack: number = 3;
  private _notificationType = NotificationType;
  private _notificationsQueue: Array<Notification> = [];
  private _visibleNotifications: Array<Notification> = [];
  private _isMouseEntered = false;

  constructor(private _cdr: ChangeDetectorRef) {

  }

  attachNotification(notification) {
    if (notification) {
      this._notificationsQueue.push(notification);
      this._notificationsQueue = this._notificationsQueue.slice(-this._maxStack);

      if (!this._isMouseEntered) {
        if (this._visibleNotifications.length < this._maxStack) {
          this.updateVisibleNotifications();
        } else {
          this.removeNotification(last(this._visibleNotifications));
        }
      }
    }
  }

  onStartNotificationTimeOut(notification: Notification): void {
    if (!notification['timer']) {
      if (!this._isMouseEntered) {
        this.runNotificationTimeout(notification);
      }
    }
  }

  runNotificationTimeout(notification: Notification): void {
    notification['startDate'] = new Date().getTime();
    notification['delay'] = notification['delay'] ? notification['delay'] : this._delay;
    notification['timer'] = setTimeout(() => this.removeNotification(notification), notification['delay']);
  }

  stopNotificationTimeout(notification: Notification): void {
    const currentDate = new Date().getTime();

    clearTimeout(notification['timer']);
    notification['delay'] = notification['delay'] - (currentDate - notification['startDate']);
  }

  removeNotificationTimeout(notification: Notification): void {
    notification['class'] = 'remove';
    clearTimeout(notification['timer']);
    this._cdr.markForCheck();
  }

  onEnter(): void {
    this._isMouseEntered = true;
    this._visibleNotifications.forEach(n => {
      this.stopNotificationTimeout(n);
    });
  }

  onLeave(): void {
    this._isMouseEntered = false;
    this._visibleNotifications.forEach(n => {
      this.runNotificationTimeout(n);
    });
  }

  removeNotification(notification: Notification): void {
    this.removeNotificationTimeout(notification);

    setTimeout(() => {
      this._visibleNotifications.splice(this._visibleNotifications.indexOf(notification), 1);
      this.updateVisibleNotifications();
    }, 500);
  }

  updateVisibleNotifications() {
    this._visibleNotifications = this._notificationsQueue
      .splice(0, this._maxStack - this._visibleNotifications.length)
      .concat(this._visibleNotifications);

    this._cdr.markForCheck();
  }

}
