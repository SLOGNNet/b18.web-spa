import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Address {
  @JsonMember
  id: number = 0;
  @JsonMember
  name: string = 'Main Office';
  @JsonMember
  streetAddress1: string = '14701 Charlson Road, United States';
  @JsonMember
  streetAddress2: string = '';
  @JsonMember
  city: string = 'Eden Prairie';
  @JsonMember
  phone: string = '(925) 937-8500';
  @JsonMember
  state: string = 'MN';
  @JsonMember
  zip: string = '55347';
  @JsonMember
  fax: string = '';
  @JsonMember
  phoneExtension: string = '';
  @JsonMember
  faxExtension: string = '';
  @JsonMember
  latitude: number = 40.795675;
  @JsonMember
  longitude: number = -73.93600099999998;

  static create(): Address {
    const result = new Address();
    return result;
  }

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
}
