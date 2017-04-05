import { Component, Input } from '@angular/core';
import { Driver, License, LicenseClassTypes } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'driver-license',
  templateUrl: './driver-license.component.html',
  styleUrls: ['./driver-license.component.scss']
})
export class DriverLicenseComponent {
  public restrictions: string;
  public endorsements: string;
  @Input() driver: Driver;

  constructor(private constants: Constants) {

  }

  updateRestrictions() {
    if (this.driver.license.restrictions) {
      this.restrictions = this.constants.ORDERED_RESTRICTIONS.filter(restriction => this.driver.license.restrictions.includes((restriction))).join(', ');
    } else {
      this.restrictions = '';
    }

    if (this.driver.license.endorsements) {
      this.endorsements = this.constants.ORDERED_ENDORSEMENTS.filter(endorsment => this.driver.license.endorsements.includes((endorsment))).join(', ');
    } else {
      this.endorsements = '';
    }
  }

  ngOnChanges(changes) {
    if (changes.driver) {
      this.updateRestrictions();
    }
  }

  get licenseClassText() {
    return LicenseClassTypes.displayText(this.driver.license.licenseClass);
  }
}
