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
    result.contactInfo = [{
      label: 'primaryPhone',
      value: '',
      type: ContactInfoType.Phone
    },
    {
      label: 'alternativePhone',
      value: '',
      type: ContactInfoType.Phone
    },
    {
      label: 'fax',
      value: '',
      type: ContactInfoType.Fax
    },
    {
      label: 'email',
      value: '',
      type: ContactInfoType.Email
    }];
    return result;
  }
}
