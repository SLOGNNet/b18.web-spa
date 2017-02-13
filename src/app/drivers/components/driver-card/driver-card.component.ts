import { Component, Input } from '@angular/core';
import { Driver } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent {
    @Input() driver: Driver;
    croppedDriverFirstName: string;
    croppedDriverLastName: string;

    get driverStatusColor(): string {
      return Driver.getStatusColor(this.driver.status);
    }

    get driverTypeText(): string {
      return Driver.getTypeText(this.driver.type);
    }

    get driverStatusText(): string {
      return Driver.getStatusText(this.driver.status);
    }
}
