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
  public endorsementsTypes: string;
  @Input() driver: Driver;

  constructor(private constants: Constants) {

  }

  ngOnChanges(changes) {
    if (changes.driver) {
      this.restrictionsTypes  = this.driver.license.restrictions &&  this.driver.license.restrictions.split(' ').join(', ');
      this.endorsementsTypes = this.driver.license.endorsements && this.driver.license.endorsements.split(' ').join(', ');
    }
  }

  get licenseClassText() {
    return LicenseClassTypes.displayText(this.driver.license.licenseClass);
  }
}
