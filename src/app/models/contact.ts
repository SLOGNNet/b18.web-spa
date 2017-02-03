import { Address } from './index';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Contact {
  @JsonMember
  id: number = 0;
  @JsonMember
  firstName: string = '';
  @JsonMember
  lastName: string = '';
  @JsonMember
  personalEmail: string = '';
  @JsonMember
  position: string = '';
  @JsonMember
  addressId: number;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {

  }
};
