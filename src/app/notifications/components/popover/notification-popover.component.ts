import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './notification-popover.component.html',
    styleUrls: ['./notification-popover.component.scss']
})
export class NotificationsPopoverComponent {


  @Input() headerTitleText: string;
  @Input() newItemsCount: number = 0;



  ngOnInit() {
    console.log("NotificationsPopoverComponent init");
  }

  onRefreshClick(event) {
    console.log("refresh button clicked");
  }

}
