import { ContactInfo } from './contact-info';
import { Address } from './address';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Contact {
  @JsonMember
  id: number = 0;
  @JsonMember
  firstName: string = '';
  @JsonMember
  middleName: string = '';
  @JsonMember
  lastName: string = '';
  @JsonMember({ elements: ContactInfo })
  contactInfo: Array<ContactInfo>;
  @JsonMember
  position: string = '';
  @JsonMember({ elements: Address })
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
