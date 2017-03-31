import { Component, Input } from '@angular/core';
import { Driver, DriverTypes } from '../../../../../models';
import { Constants } from '../../../../../shared';


@Component({
  selector: 'driver-information',
  templateUrl: './driver-information.component.html',
  styleUrls: ['./driver-information.component.scss']
})
export class DriverInformationComponent {
  @Input() driver: Driver;
  streetAddress: string;

  constructor(private constants: Constants) {

  }

  get driverType() {
    return DriverTypes.displayText(this.driver.type);
  }

  ngOnChanges(changes) {
    if (changes.driver) {
      const stateAndZip = [this.driver.address.state, this.driver.address.zip].filter(v => v).join(' ').trim();
      this.streetAddress = [
        this.driver.address.streetAddress1,
        this.driver.address.streetAddress2,
        this.driver.address.city, stateAndZip].filter(v => v).join(', ');
    }
  }
}
