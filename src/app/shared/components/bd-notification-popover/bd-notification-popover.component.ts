import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BdMessageCardComponent, BdTaskCardComponent } from './notification-cards';
import { BdPopoverContent } from './directives/bd-popover';
import { Notification, NotificationType } from '../../../models';

const POPOVER_LIMIT = 8;

class ViewedNotification {
   notification: Notification;
   viewed: boolean;

   constructor(){}
}

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './bd-notification-popover.component.html',
    styleUrls: ['./bd-notification-popover.component.scss']
})
export class BdNotificationPopoverComponent {

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();

  @Input() itemsCount: number = 0;
  @Input() width: number;
  @Input() set items(notifications: Array<Notification>) {
    this._items = notifications;
    notifications.map(item => {
      console.log(item);
    });
  }

  @Input() set notificationType(type: NotificationType) {
    const typeText = Notification.getTypeText(type);
    this.topIconClassName = this._itemsName = this.titleText = typeText;
    this._notificationType = type;
  }

  private notificationTypeEnum = NotificationType;
  private _items: Array<Notification> = new Array<Notification>(POPOVER_LIMIT);
  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;
  private _itemsName: string = '';
  private _notificationType: NotificationType;
  private _hadSeenNotification: boolean = false;

  set topIconClassName(val: string) {
    this._iconClass = 'icon-' + val + 's';
  }

  set titleText(val: string) {
    this._titleText = 'Latest ' + val + 's';
  }

  set itemsName(val: string) {
    if (this.itemsCount > 1) this._itemsName = val + 's';
    else this._itemsName = val;
  }

  ngOnInit(){
    console.log(this._items);
  }

  createSeenNotification(notification, viewed): ViewedNotification {
    let result: ViewedNotification;
    result.notification = notification;
    result.viewed = viewed;
    return result;
  }

  onRefreshClick(event) {
    this.refresh.emit({
      action: 'refresh'
    });
  }

  onShowAllClick(){
    this.showAll.emit({
      action: 'showAll'
    });
  }

  handleOnShownEvent(event){
    this._topIconActive = event.visible;
  }

  handleOnHiddenEvent(event){
    this._topIconActive = event.visible;
    this._hadSeenNotification = true;
  }

}
