import { ContactInfoType } from './enums';
import { Transform } from 'class-transformer';
import { toEnumTransformer, fromEnumTransformer } from './utils';

const contactInfoTypes = createInfoTypes();

function createInfoTypes() {
  let result = {};
    result[ContactInfoType.NONE] = 'None';
    result[ContactInfoType.PHONE] = 'Phone';
    result[ContactInfoType.FAX] = 'Fax';
    result[ContactInfoType.EMAIL] = 'Email';
  return result;
}

export class ContactInfo {
  label: string = '';
  value: string = '';
  @Transform(toEnumTransformer(ContactInfoType), { toClassOnly: true })
  @Transform(fromEnumTransformer(ContactInfoType), { toPlainOnly: true })
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
      type: ContactInfoType.PHONE
    },
    {
      label: 'Alternative Phone',
      value: '',
      type: ContactInfoType.PHONE
    },
    {
      label: 'Fax',
      value: '',
      type: ContactInfoType.FAX
    },
    {
      label: 'Email',
      value: '',
      type: ContactInfoType.EMAIL
    }];
  }
}
