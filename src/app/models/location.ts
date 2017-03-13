import { generateNewId } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';
import { ContactInfoType } from './enums';

export class Location {
  id: number;
  name: string;
  address: Address;
  contactInfo: Array<ContactInfo>;

  static create(): Location {
    const result = new Location();
    result.id = generateNewId();
    result.address = Address.create();
    result.contactInfo = ContactInfo.create();
    return result;
  }
}
