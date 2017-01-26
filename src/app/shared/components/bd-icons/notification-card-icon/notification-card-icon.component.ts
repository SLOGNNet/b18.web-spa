import { Component, Input } from '@angular/core';
import { NotificationCard } from '../../../../models';

@Component({
  selector: 'notification-card-icon',
  styleUrls: ['./notification-card-icon.component.scss'],
  templateUrl: './notification-card-icon.component.html'
})
export class NotificationCardIcon {
  @Input() type: number;
  private iconClass: boolean;


  ngOnInit() {
    this.updateType();
  }

  updateType() {
    if (this.type === 3) {
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

  get getTypeColor(): string {
    return NotificationCard.getTypeColor(this.type);
  }
}
