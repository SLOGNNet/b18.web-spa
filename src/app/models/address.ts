import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

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
  latitude: number;
  @JsonMember
  longitude: number;

  static create(): Address {
    const result = new Address();
    return result;
  }

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
}
