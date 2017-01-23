import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bd-notification-popover',
    templateUrl: './notification-popover.component.html',
    styleUrls: ['./notification-popover.component.scss']
})
export class NotificationsPopoverComponent {

  ngOnInit() {
    console.log("NotificationsPopoverComponent init");
  }

}
