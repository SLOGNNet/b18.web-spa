import { Address } from './index';
import { ContactInfoType } from './enums';

const contactInfoTypes = createInfoTypes();

function createInfoTypes() {
  let result = {};
    result[ContactInfoType.None] = 'None';
    result[ContactInfoType.Phone] = 'Phone';
    result[ContactInfoType.Fax] = 'Fax';
    result[ContactInfoType.Email] = 'Email';
  return result;
}

export class ContactInfo {
  label: string = '';
  value: string = '';
  type: ContactInfoType;


  public static getPrimaryPhone(collection: Array<ContactInfo>): ContactInfo {
    let result: ContactInfo = null;
    result = collection.filter(item => item.label === 'primaryPhone')[0];
    return result;
  }

  public static getContactInfoType(type: ContactInfoType): string {
    return contactInfoTypes[type];
  }
}
