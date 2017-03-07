import { Address } from './address';
import { ContactInfo } from './contact-info';
import { generateNewId } from './utils';
import { Type } from 'class-transformer';

export class Facility {
  id: number;
  @Type(() => Address)
  address: Address;
  name: string = '';
  notes: string = '';
  businessHours: string = '';
  @Type(() => ContactInfo)
  contactInfo: Array<ContactInfo>;

  static create(): Facility{
    const result = new Facility();
    result.id = generateNewId();
    result.address = Address.create();
    result.contactInfo = [];
    return result;
  }
}
