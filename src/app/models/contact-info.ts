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

  public static getPrimaryPhone(contactInfoList: Array<ContactInfo>): ContactInfo {
    const info = contactInfoList.filter(item => {
      return item.label === 'Primary Phone';
    });

    return info[0];
  }

  public static getContactInfoType(type: ContactInfoType): string {
    return contactInfoTypes[type];
  }

  public static сreateDefaultList() {
    return [{
      label: 'Primary Phone',
      value: '',
      type: ContactInfoType.Phone
    },
    {
      label: 'Alternative Phone',
      value: '',
      type: ContactInfoType.Phone
    },
    {
      label: 'Fax',
      value: '',
      type: ContactInfoType.Fax
    },
    {
      label: 'Email',
      value: '',
      type: ContactInfoType.Email
    }];
  }
}
