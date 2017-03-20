import { generateNewIdString } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';
import { Type } from 'class-transformer';

export class Member {
  id: string;
  @Type(() => Address)
  address: Address;
  @Type(() => ContactInfo)
  contactInfo: Array<ContactInfo> = [];
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';

  static create(): Member {
    const result = new Member();
    result.id = generateNewIdString();
    return result;
  }
}
