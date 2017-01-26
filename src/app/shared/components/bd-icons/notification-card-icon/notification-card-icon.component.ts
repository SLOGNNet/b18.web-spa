import { Component, Input } from '@angular/core';
import { NotificationCard } from '../../../../models';

@Component({
  selector: 'notification-card-icon',
  styleUrls: ['./notification-card-icon.component.scss'],
  templateUrl: './notification-card-icon.component.html'
})
export class NotificationCardIcon {
  @Input() eventType: number;
  private iconClass: boolean;


  ngOnInit() {
    this.updateType();
  }

  updateType() {
    if (this.eventType === 3) {
      this.iconClass = true;
    } else {
      this.iconClass = false;
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
