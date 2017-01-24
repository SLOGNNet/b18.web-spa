import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BdPopoverContent } from './directives/bd-popover';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './bd-notification-popover.component.html',
    styleUrls: ['./bd-notification-popover.component.scss']
})
export class BdNotificationPopoverComponent {

  @Input() headerTitleText: string;
  @Input() newItemsCount: number = 0;
  @Input() width: number;

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();


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

}
