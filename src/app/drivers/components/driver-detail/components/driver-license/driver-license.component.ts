import { Component, Input } from '@angular/core';
import { Driver, License, LicenseClassTypes } from '../../../../../models';
import { Constants } from '../../../../../shared';

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
      this.restrictionsTypes = this.driver.license.restrictions.split(' ').join(', ');
      this.endorsmentsTypes = this.driver.license.endorsments.split(' ').join(', ');
    }
  }

  get licenseClassText() {
    return LicenseClassTypes.text(this.driver.license.class);
  }
}
