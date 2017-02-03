import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Address {
  @JsonMember
  id: number = 0;
  @JsonMember
  name: string = '';
  @JsonMember
  streetAddress: string = '';
  @JsonMember
  secondStreetAddress: string = '';
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
  location: {
    lat: number;
    lng: number;
  };

  static create(): Address{
    const result = new Address();
    return result;
  }

  constructor() {
    this.location = { lat: 0, lng: 0 };
  }
}
