import { generateNewId } from './utils';
import { Address } from './address';
import { ContactInfo } from './contact-info';

export class Member {
  id: number;
  address: Address;
  contactInfo: Array<ContactInfo>;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';

  static create(): Member {
    const result = new Member();
    result.id = generateNewId();
    return result;
  }
}
