import { Address } from './index';
import { ContactInfoType } from './enums';

export class ContactInfo {
  label: string = '';
  value: string = '';
  type: ContactInfoType;
}
