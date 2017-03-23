import { LicenseClassTypes } from './enums';

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
}
