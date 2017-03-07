import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { LicenseClassTypes } from './enums';
import { Type } from 'class-transformer';

@JsonObject
export class License {
  id: number = 0;
  number: string;
  expiration: Date;
  dateIssued: Date;
  stateIssued: string;
  class: LicenseClassTypes;
  endorsments: string = 'A C';
  restrictions: string = 'MN';

  static create(): License {
    const result = new License();
    return result;
  }
}
