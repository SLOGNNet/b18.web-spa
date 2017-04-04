import { Component, Input } from '@angular/core';
import { Driver, License, LicenseClassTypes } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'driver-license',
  templateUrl: './driver-license.component.html',
  styleUrls: ['./driver-license.component.scss']
})
export class DriverLicenseComponent {
  public orderedEndorsments = ['P', 'H', 'M', 'N', 'T', 'X', 'L', 'S'];
  public orderedRestrictions = ['B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M', 'N', 'O', 'Z', 'T'];
  public restrictions: string;
  public endorsements: string;
  @Input() driver: Driver;

  constructor(private constants: Constants) {

  }

  ngOnChanges(changes) {
    if (changes.driver) {
      this.restrictions  = this.orderedRestrictions.filter(restriction => this.driver.license.restrictions.includes((restriction))).join(', ');
      this.endorsements = this.orderedEndorsments.filter(endorsment => this.driver.license.endorsements.includes((endorsment))).join(', ');
    }
  }

  get licenseClassText() {
    return LicenseClassTypes.displayText(this.driver.license.licenseClass);
  }
}
