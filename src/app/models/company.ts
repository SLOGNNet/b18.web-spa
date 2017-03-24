import { Location } from './location';
import { Contact } from './contact';
import { Load } from './load';
import { generateNewId } from './utils';
import { CompanyTypes, CompanyStatuses } from './enums';
import { Type } from 'class-transformer';

export class Company {
  id: string;
  name: string = '';
  @Type(() => Contact)
  contacts: Contact[];
  status: CompanyStatuses;
  type: CompanyTypes;
  mc: string = '';
  taxId: string = '';
  @Type(() => Location)
  locations: Array<Location>;
  email: string = '';
  loads: Array<Load>;

  static create(): Company{
    const result = new Company();
    result.id = generateNewId();
    result.contacts = [];
    result.locations = [];
    return result;
  }

  constructor() {
    this.locations = new Array<Location>();
    this.contacts = new Array<Contact>();
  }
}
