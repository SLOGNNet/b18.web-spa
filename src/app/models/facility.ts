import { Address } from './address';
import { ContactInfo } from './contact-info';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Facility {
  @JsonMember
  id: number;
  @JsonMember({ elements: Address })
  address: Address;
  @JsonMember
  name: string = '';
  @JsonMember
  notes: string = '';
  @JsonMember
  businessHours: string = '';
  @JsonMember({ elements: ContactInfo })
  contactInfo: Array<ContactInfo>;

  static create(): Facility{
    const result = new Facility();
    result.id = generateNewId();
    result.address = Address.create();
    result.contactInfo = [];
    return result;
  }
}
