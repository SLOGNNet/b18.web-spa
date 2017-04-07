import { generateNewId } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';
import { schema } from 'normalizr';

export const locationSchema = new schema.Entity('locations');

export class Location {
  id: string;
  name: string;
  address: Address;
  contactInfo: Array<ContactInfo>;

  static create(): Location {
    const result = new Location();
    result.id = generateNewId();
    result.address = Address.create();
    result.contactInfo = ContactInfo.сreateDefaultList();
    return result;
  }
}
