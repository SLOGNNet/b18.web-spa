import { Component, Input } from '@angular/core';
import { NotificationCard, Type } from '../../../../models';

@Component({
  selector: 'notification-card-icon',
  styleUrls: ['./notification-card-icon.component.scss'],
  templateUrl: './notification-card-icon.component.html'
})
export class NotificationCardIcon {
  @Input() eventType: number;
  private isSuccess: boolean;


  ngOnInit() {
    this.updateType();
  }

  updateType() {
    if (this.eventType === Type.Error) {
      this.isSuccess = false;
    } else {
      this.isSuccess = true;
    }
  }

  ngOnChanges(changes) {
    if (changes.type) {
      this.updateType();
    }
  }

  get getEventTypeColor(): string {
    return NotificationCard.getEventTypeColor(this.eventType);
  }
}
