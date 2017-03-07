import { Address } from './address';
import { Contact } from './contact';
import { Load } from './load';
import { generateNewId } from './utils';
import { CompanyTypes, CompanyStatuses } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Type } from 'class-transformer';
// Colors
function createStatusColors() {
 let result = {};
  result[CompanyStatuses.Unavaliable] = '#ffbe4d';
  result[CompanyStatuses.Active] = '#85d183';
  result[CompanyStatuses.Inactive] = '#fb3a3a';
  return result;
};

function createStatusText() {
 let result = {};
  result[CompanyStatuses.None] = 'none';
  result[CompanyStatuses.Unavaliable] = 'unavaliable';
  result[CompanyStatuses.Active] = 'active';
  result[CompanyStatuses.Inactive] = 'inactive';
  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();

@JsonObject()
export class Company {
  id: number;
  name: string = 'CH ROBINSON COMPANY INC';
  @Type(() => Contact)
  contacts: Contact[];
  status: CompanyStatuses;
  type: CompanyTypes;
  mc: string = '384859';
  taxId: string = '';
  @Type(() => Address)
  addresses: Array<Address>;
  email: string = 'carrier.services@chrobinson.com';
  loads: Array<Load>;

  static create(): Company{
    const result = new Company();
    result.id = generateNewId();
    result.status = CompanyStatuses.Inactive;
    result.type = CompanyTypes.Broker;
    return result;
  }

  public static getStatusColor(status: CompanyStatuses): string {
    return statusColors[status];
  }

  static getStatusText(status: CompanyStatuses) {
    return statusText[status];
  }

  constructor() {
    this.addresses = new Array<Address>();
    this.contacts = new Array<Contact>();
  }
}
