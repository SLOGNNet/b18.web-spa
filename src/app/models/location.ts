import { generateNewId } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';

export class Location {
  id: number;
  address: Address;
  contactInfo: Array<ContactInfo>;

  static create(): Location {
    const result = new Location();
    result.id = generateNewId();
    return result;
  }
}
