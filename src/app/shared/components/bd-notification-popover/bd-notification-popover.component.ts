import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BdMessageCardComponent, BdTaskCardComponent } from './notification-cards';
import { BdPopoverContent } from './directives/bd-popover';
import { Notification, NotificationType } from '../../../models';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './bd-notification-popover.component.html',
    styleUrls: ['./bd-notification-popover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdNotificationPopoverComponent {

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();

  @Input() itemsCount: number = 0;
  @Input() width: number;
  @Input() items: Array<Notification> = [];
  @Input() set notificationType(type: NotificationType) {
    const typeText = Notification.getTypeText(type);
    this.topIconClassName = this._itemsName = this.titleText = typeText;
    this._notificationType = type;
  }

  private notificationTypeEnum = NotificationType;
  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;
  private _itemsName: string = '';
  private _notificationType: NotificationType;
  private _notifications: Array<Notification> = [];

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

  ngOnChanges(changes) {
    if (changes.items) {
      this._notifications = this.items.filter(n => n.type === this._notificationType);
    }
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
  }

}
