import { Component, Input } from '@angular/core';
import { Driver } from '../../../models';

@Component({
  selector: 'driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent {
    @Input() driver: Driver;
    croppedDriverFirstName: string;
    croppedDriverLastName: string;

    get driverTypeText(): string {
      return Driver.getTypeText(this.driver.type);
    }

    get driverStatusText(): string {
      return Driver.getStatusText(this.driver.status);
    }

    ngOnInit() {
       this.croppedDriverFirstName = this.driver.firstName.replace(/ /g, '').substr(0, 1).toUpperCase();
       this.croppedDriverLastName = this.driver.lastName.replace(/ /g, '').substr(0, 1).toUpperCase();
    }

}
