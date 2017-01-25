import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Notification, NotificationType } from '../models';

@Component({
  selector: 'bd-toast-manager',
  templateUrl: './bd-toast-manager.component.html',
  styleUrls: ['./bd-toast-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdToastManagerComponent {
  @Input() notifications: Array<Notification>;

  private _delay: number = 10000;
  private _maxStack: number = 5;
  private _notificationType = NotificationType;
  private _notifications: Array<Notification> = [];
  private _isMouseEntered = false;

  constructor(private _cdr: ChangeDetectorRef) {

  }

  ngOnChanges(changes) {
    if (changes.notifications) {
      this._notifications = this.notifications
                                .concat(this._notifications)
                                .slice(0, this._maxStack);
    }
  }

  onStartNotificationTimeOut(notification: Notification): void {
    if (!notification['timer']) {
      notification['class'] = 'add';

      if (!this._isMouseEntered) {
        this.runNotificationTimeout(notification);
      }

      setTimeout(() => this._cdr.markForCheck(), 0);
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
    setTimeout(() => this._cdr.markForCheck(), 0);
  }

  onEnter(): void {
    this._isMouseEntered = true;
    this._notifications.forEach(n => {
      this.stopNotificationTimeout(n);
    });
  }

  onLeave(): void {
    this._isMouseEntered = false;
    this._notifications.forEach(n => {
      this.runNotificationTimeout(n);
    });
  }

  removeNotification(notification: Notification): void {
    this.removeNotificationTimeout(notification);

    setTimeout(() => {
      this._notifications = this._notifications.filter(n => n.id !== notification.id);
      this._cdr.markForCheck();
    }, 600);
  }

}
