import { Component, Input } from '@angular/core';
import { Driver, License } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'driver-information',
  templateUrl: './driver-information.component.html',
  styleUrls: ['./driver-information.component.scss']
})
export class DriverInformationComponent {
  @Input() driver: Driver;

  constructor(private constants: Constants) {

  }

  get driverType() {
    return Driver.getTypeText(this.driver.type);
  }
}
