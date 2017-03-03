import { ContactInfo } from './contact-info';
import { Address } from './address';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Contact {
  @JsonMember
  id: number = 0;
  @JsonMember
  firstName: string = 'John';
  @JsonMember
  middleName: string = 'Doe';
  @JsonMember
  lastName: string = 'Doe';
  @JsonMember
  primaryPhone: string = '';
  @JsonMember
  alternativePhone: string = '';
  @JsonMember
  fax: string = '';
  @JsonMember({ elements: ContactInfo })
  contactInfo: Array<ContactInfo>;
  email: string = '';
  @JsonMember
  position: string = 'Driver';
  // @JsonMember
  address: Address;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {
    this.contactInfo = new Array<ContactInfo>();
  }
};
