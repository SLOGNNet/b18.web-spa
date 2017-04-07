import { ContactInfo } from './contact-info';
import { Location } from './location';
import { Type } from 'class-transformer';
import { generateNewId } from './utils';
import { schema } from 'normalizr';

export const contactSchema = new schema.Entity('contacts');

export class Contact {
  id: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  @Type(() => ContactInfo)
  contactInfo: Array<ContactInfo>;
  position: string = '';
  locationId: string;
  @Type(() => Location)
  location: Location;

  static create(): Contact{
    const result = new Contact();
    result.id = generateNewId();
    result.contactInfo = [];
    return result;
  }

  constructor() {
    this.contactInfo = new Array<ContactInfo>();
    this.location = Location.create();
  }
};
