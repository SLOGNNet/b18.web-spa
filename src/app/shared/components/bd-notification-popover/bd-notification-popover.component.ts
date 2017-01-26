import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BdMessageCardComponent } from './notification-cards';
import { BdPopoverContent } from './directives/bd-popover';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './bd-notification-popover.component.html',
    styleUrls: ['./bd-notification-popover.component.scss']
})
export class BdNotificationPopoverComponent {

  @Input() itemsCount: number = 0;
  @Input() width: number;
  @Input() set notificationType(val: string) {
    this._iconClass = 'icon-' + val;
    this._titleText = 'Latest ' + val;
    if (this.itemsCount < 2) this._itemsName = val.slice(0, val.length - 1);
    else this._itemsName = val;

  }

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();

  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;
  private _itemsName: string = '';


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
