import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './bd-notification-popover.component.html',
    styleUrls: ['./bd-notification-popover.component.scss']
})
export class BdNotificationPopoverComponent {

  @Input() headerTitleText: string;
  @Input() newItemsCount: number = 0;

  ngOnInit() {
    console.log("NotificationsPopoverComponent init");
  }

  onRefreshClick(event) {
    console.log("refresh button clicked");
  }

}
