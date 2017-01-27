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
  private _maxStack: number = 5;
  private _maxVisibleStack: number = 3;
  private _notificationType = NotificationType;
  private _notificationsQueue: Array<Notification> = [];
  private _visibleNotifications: Array<Notification> = [];
  private _isMouseEntered = false;

  constructor(private _cdr: ChangeDetectorRef) {

  }

  get toastConfig() {
    return {
      timer: null,
      delay: this._delay,
      isRemoved: false,
      startDate: new Date().getTime(),
      updateDelay() {
        const newStatrDate = new Date().getTime();
        this.delay = this.delay - (newStatrDate - this.startDate);
        this.startDate = newStatrDate;
      },
      runTimeOut(callback: Function) {
        this.startDate = new Date().getTime();
        this.timer = setTimeout(() => callback(), this.delay);
      }
    };
  }

  getNotificationConfig(notification) {
    return notification['toastConfig'];
  }

  setNotificationConfig(notification) {
    notification['toastConfig'] = this.toastConfig;
  }

  attachNotification(notification) {
    if (notification && typeof notification === 'object') {
      this.setNotificationConfig(notification);
      this._notificationsQueue.push(notification);
      this._notificationsQueue = this._notificationsQueue.slice(-this._maxStack);

      if (!this._isMouseEntered) {
        if (this._visibleNotifications.length < this._maxVisibleStack) {
          this.updateVisibleNotifications();
        } else {
          this.removeNotification(last(this._visibleNotifications), true);
        }
      }
    }
  }

  onStartNotificationTimeOut(notification: Notification): void {
    const config = this.getNotificationConfig(notification);

    if (!config.timer && !this._isMouseEntered) {
      this.runNotificationTimeout(notification);
    }
  }

  isNotificationRemoved(notification) {
    const config = this.getNotificationConfig(notification);

    return config.isRemoved;
  }

  runNotificationTimeout(notification: Notification): void {
    let config = this.getNotificationConfig(notification);
    config.runTimeOut(() => this.removeNotification(notification));
  }

  stopNotificationTimeout(notification: Notification): void {
    let config = this.getNotificationConfig(notification);

    clearTimeout(config.timer);
    config.updateDelay();
  }

  removeNotificationTimeout(notification: Notification): void {
    let config = this.getNotificationConfig(notification);

    config.isRemoved = true;
    clearTimeout(config.timer);
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

  removeNotification(notification: Notification, force: boolean = false): void {
    this.removeNotificationTimeout(notification);

    setTimeout(() => {
      this._visibleNotifications.splice(this._visibleNotifications.indexOf(notification), 1);
      this.updateVisibleNotifications();
    }, force ? 0 : 500);
  }

  updateVisibleNotifications() {
    this._visibleNotifications = this._notificationsQueue
      .splice(0, this._maxVisibleStack - this._visibleNotifications.length)
      .concat(this._visibleNotifications);

    this._cdr.markForCheck();
  }

}
