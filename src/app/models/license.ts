import { LicenseClassTypes } from './enums';
import { Type } from 'class-transformer';

export class License {
  id: number = 0;
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
    result.class = LicenseClassTypes.None;
    return result;
  }
}
