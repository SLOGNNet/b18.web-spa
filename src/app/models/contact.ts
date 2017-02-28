import { Address } from './index';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Contact {
  @JsonMember
  id: number = 0;
  @JsonMember
  firstName: string = 'John';
  @JsonMember
  lastName: string = 'Doe';
  @JsonMember
  personalEmail: string = '';
  @JsonMember
  position: string = 'Driver';
  @JsonMember
  addressId: number = 0;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {

  }
};
