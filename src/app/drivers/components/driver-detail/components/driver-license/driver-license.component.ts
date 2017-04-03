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

  licenseType: any;
  licencesArr: any;
  restrictions: any;


  sortEndorsementsByTypes(a) {
    let sortedStr = '';
    if (this.driver.license.endorsements) {
      this.licencesArr = a.split(" ");
      const endorsementsConfig = {
        P: [],
        H: [],
        M: [],
        N: [],
        T: [],
        X: [],
        L: [],
        S: []
      }

      this.licencesArr.forEach((licenseType) => {
        switch (licenseType.charAt(0)) {
          case "P":
            endorsementsConfig["P"].push(licenseType);
            break;
          case "H":
            endorsementsConfig["H"].push(licenseType);
            break;
          case "M":
            endorsementsConfig["M"].push(licenseType);
            break;
          case "N":
            endorsementsConfig["N"].push(licenseType);
            break;
          case "T":
            endorsementsConfig["T"].push(licenseType);
            break;
          case "X":
            endorsementsConfig["X"].push(licenseType);
            break;
          case "L":
            endorsementsConfig["L"].push(licenseType);
            break;
          case "S":
            endorsementsConfig["S"].push(licenseType);
            break;
        }
      });
      for (this.licenseType in endorsementsConfig) {
        if (endorsementsConfig[this.licenseType].length) {
          sortedStr += endorsementsConfig[this.licenseType][0] + " ";
        }
      }
      sortedStr = sortedStr.slice(0, -1);
      return sortedStr.split(' ').join(', ');
    } else {
      return;
    }
  }

  sortRestrictionsByTypes(restrictions) {
    var sortedStr = '';
    if (this.driver.license.endorsements) {
      this.restrictions = restrictions.split(" ");
      const restrictionsConfig = {
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        Z: [],
        T: []
      }

      this.restrictions.forEach((licenseType) => {
        switch (licenseType.charAt(0)) {
          case "B":
            restrictionsConfig["B"].push(licenseType);
            break;
          case "C":
            restrictionsConfig["C"].push(licenseType);
            break;
          case "D":
            restrictionsConfig["D"].push(licenseType);
            break;
          case "E":
            restrictionsConfig["E"].push(licenseType);
            break;
          case "F":
            restrictionsConfig["F"].push(licenseType);
            break;
          case "G":
            restrictionsConfig["G"].push(licenseType);
            break;
          case "K":
            restrictionsConfig["K"].push(licenseType);
            break;
          case "L":
            restrictionsConfig["L"].push(licenseType);
            break;
          case "M":
            restrictionsConfig["M"].push(licenseType);
            break;
          case "N":
            restrictionsConfig["N"].push(licenseType);
            break;
          case "O":
            restrictionsConfig["O"].push(licenseType);
            break;
          case "Z":
            restrictionsConfig["Z"].push(licenseType);
            break;
          case "T":
            restrictionsConfig["T"].push(licenseType);
            break;
        }
      });
      for (this.licenseType in restrictionsConfig) {
        if (restrictionsConfig[this.licenseType].length) {
          sortedStr += restrictionsConfig[this.licenseType][0] + " ";
        }
      }
      sortedStr = sortedStr.slice(0, -1);
      return sortedStr.split(' ').join(', ');
    } else {
      return;
    }
  }

  // ngOnChanges(changes) {
  //   if (changes.driver) {
  //     this.restrictionsTypes  = this.driver.license.restrictions &&  this.driver.license.restrictions.split(' ').join(', ');
  //     this.endorsementsTypes = this.driver.license.endorsements && this.driver.license.endorsements.split(' ').join(', ');
  //   }
  // }

  get licenseClassText() {
    return LicenseClassTypes.displayText(this.driver.license.licenseClass);
  }
}
