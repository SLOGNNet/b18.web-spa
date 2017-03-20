import { Address } from './address';
import { ContactInfo } from './contact-info';
import { generateNewId } from './utils';

export class Member {
  id: string;
  address: Address;
  contactInfo: Array<ContactInfo> = [];
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';

  static create(): Member {
    const result = new Member();
    result.id = generateNewId();
    return result;
  }
}
