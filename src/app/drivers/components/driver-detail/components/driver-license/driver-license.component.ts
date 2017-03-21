import { Component, Input } from '@angular/core';
import { Driver, License } from '../../../../../models';
import { Constants } from '../../../../../shared';
import { isNil } from 'lodash';

@Component({
  selector: 'driver-license',
  templateUrl: './driver-license.component.html',
  styleUrls: ['./driver-license.component.scss']
})
export class DriverLicenseComponent {
  public restrictionsTypes: string;
  public endorsmentsTypes: string;
  @Input() driver: Driver;

  constructor(private constants: Constants) {

  }

  ngOnChanges(changes) {
    if (changes.driver) {
      if (!isNil(this.driver.license.restrictions) && !isNil(this.driver.license.endorsments)) {
        this.restrictionsTypes = this.driver.license.restrictions.split(' ').join(', ');
        this.endorsmentsTypes = this.driver.license.endorsments.split(' ').join(', ');
      }
    }
  }

  get licenseClassText() {
    return License.getLicenseClassText(this.driver.license.class);
  }
}
