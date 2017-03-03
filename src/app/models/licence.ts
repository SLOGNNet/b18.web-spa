import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { LicenceClassTypes } from './enums';

@JsonObject
export class Licence {
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
  class: LicenceClassTypes;
  @JsonMember
  endorsments: string = 'MN';
  @JsonMember
  restrictions: string = 'MN';

  static create(): Licence {
    const result = new Licence();
    return result;
  }
}
