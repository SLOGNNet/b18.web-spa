import { ContactInfo } from './contact-info';
import { Address } from './address';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Type } from 'class-transformer';

@JsonObject
export class Contact {
  id: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  @Type(() => ContactInfo)
  contactInfo: Array<ContactInfo>;
  position: string = '';
  @Type(() => Address)
  address: Address;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {
    this.contactInfo = new Array<ContactInfo>();
    this.address = Address.create();
  }
};
