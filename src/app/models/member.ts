import { Address } from './address';
import { ContactInfo } from './contact-info';
import { Type } from 'class-transformer';
import { generateNewId } from './utils';

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
    result.id = generateNewId();
    return result;
  }

  get fullName() {
    return [this.firstName, this.lastName].filter(v => v).join(' ');
  }

  constructor() {}
}
