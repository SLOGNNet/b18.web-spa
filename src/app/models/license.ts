import { LicenseClassTypes } from './enums';

// License Class Text
function createLicenseClassText() {
  let result = {};
  result[LicenseClassTypes.NONE] = 'None';
  result[LicenseClassTypes.CLASS_A] = 'Class A';
  result[LicenseClassTypes.CLASS_B] = 'Class B';
  result[LicenseClassTypes.CLASS_C] = 'Class C';

  return result;
};

const licenseClassText = createLicenseClassText();

export class License {
  id: string = '';
  number: string = '';
  expiration: Date;
  dateIssued: Date;
  stateIssued: string = '';
  class: LicenseClassTypes;
  endorsments: string = '';
  restrictions: string = '';

  static create(): License {
    const result = new License();
    result.expiration = null;
    result.dateIssued = null;
    result.class = LicenseClassTypes.NONE;
    return result;
  }

  public static getLicenseClassText(licenseClass: LicenseClassTypes): string {
    return licenseClassText[licenseClass];
  }

  public static getClassesCollection(): any {
    return licenseClassText;
  }
}
