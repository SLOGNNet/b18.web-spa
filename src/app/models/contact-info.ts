import { Address } from './index';
import { ContactInfoType } from './enums';

export class ContactInfo {
  label: string = '';
  value: string = '';
  type: ContactInfoType;

  public static getPrimaryPhone(contactInfoList: Array<ContactInfo>): string {
    const info = contactInfoList.filter(item => {
      return item.label === 'primaryPhone';
    });

    return info.length ? info[0].value : '';
  }
}
