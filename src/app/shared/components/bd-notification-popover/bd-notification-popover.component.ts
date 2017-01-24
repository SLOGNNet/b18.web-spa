import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  }

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();

  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;


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

  onMouseMove(){
    this._topIconActive = true;
  }

  onMouseLeave(){
    this._topIconActive = false;
  }

}
