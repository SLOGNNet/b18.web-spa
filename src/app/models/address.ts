import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { generateNewId } from './utils';

@JsonObject
export class Address {
  @JsonMember
  id: number = 0;
  @JsonMember
  name: string = '';
  @JsonMember
  streetAddress1: string = '';
  @JsonMember
  streetAddress2: string = '';
  @JsonMember
  city: string = '';
  @JsonMember
  phone: string = '';
  @JsonMember
  state: string = '';
  @JsonMember
  zip: string = '';
  @JsonMember
  fax: string = '';
  @JsonMember
  phoneExtension: string = '';
  @JsonMember
  faxExtension: string = '';
  @JsonMember
  latitude: number = 0;
  @JsonMember
  longitude: number = 0;

  static create(): Address {
    const result = new Address();
    result.id = generateNewId();
    return result;
  }

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
}
