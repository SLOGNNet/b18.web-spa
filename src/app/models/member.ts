import { generateNewIdString } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';

export class Member {
  id: string;
  address: Address;
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
