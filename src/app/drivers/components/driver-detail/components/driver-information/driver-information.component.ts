import { Component, Input } from '@angular/core';
import { Driver } from '../../../../../models';

@Component({
  selector: 'driver-information',
  templateUrl: './driver-information.component.html',
  styleUrls: ['./driver-information.component.scss']
})
export class DriverInformationComponent {
  @Input() driver: Driver;

  get driverType() {
    return Driver.getTypeText(this.driver.type);
  }
}
