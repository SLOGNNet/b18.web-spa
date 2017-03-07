import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { LicenseClassTypes } from './enums';

@JsonObject
export class License {
  @JsonMember
  id: number = 0;
  @JsonMember
  number: string;
  @JsonMember
  expiration: Date;
  @JsonMember
  dateIssued: Date;
  @JsonMember
  stateIssued: string;
  @JsonMember
  class: LicenseClassTypes;
  @JsonMember
  endorsments: string = 'A C';
  @JsonMember
  restrictions: string = 'MN';

  static create(): License {
    const result = new License();
    return result;
  }
}
