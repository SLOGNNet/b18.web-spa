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

  constructor(private _cdr: ChangeDetectorRef) {

  }

  ngOnChanges(changes) {
    if (changes.notifications) {
      this._notifications = this.notifications
                                .concat(this._notifications)
                                .slice(0, this._maxStack);
    }
  }

  startTimeOut(notification) {
    if (!notification.timer) {
      notification['class'] = 'add';
      notification['delay'] = this._delay;
      notification['date'] = new Date().getTime();
      notification['timer'] = setTimeout(() => this.removeNotification(notification), this._delay);
      setTimeout(() => this._cdr.markForCheck(), 0);
    }
  }

  onEnter(): void {
    const currentTime = new Date().getTime();
    this._notifications.forEach(n => {
      clearTimeout(n['timer']);
      n['delay'] = n['delay'] - (currentTime - n['date']);
    });
  }

  onLeave(): void {
    const currentTime = new Date().getTime();
    this._notifications.forEach(n => {
      if (n['delay']) {
        n['timer'] = setTimeout(() => this.removeNotification(n), n['delay']);
        n['date'] = currentTime;
      }
    });
  }

  removeNotification(notification) {
    notification['class'] = 'remove';
    setTimeout(() => this._cdr.markForCheck(), 0);
    setTimeout(() => {
      this._notifications = this._notifications.filter(n => n.id !== notification.id);
      this._cdr.markForCheck();
    }, 600);
  }

}
