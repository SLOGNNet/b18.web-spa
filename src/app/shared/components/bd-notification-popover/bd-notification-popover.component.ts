import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BdMessageCardComponent, BdTaskCardComponent } from './notification-cards';
import { BdPopoverContent } from './directives/bd-popover';
import { Notification } from '../../../models';

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
  @Input() items: Array<Notification> = [];
  @Input() set notificationType(val: string) {
    this.topIconClassName = val;
    this.titleText = val;
    this._itemsName = val;
    this._notificationType = val;
  }

  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;
  private _itemsName: string = '';
  private _notificationType: string;

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
