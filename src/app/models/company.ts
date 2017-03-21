import { Location } from './location';
import { Contact } from './contact';
import { Load } from './load';
import { generateNewId } from './utils';
import { CompanyTypes, CompanyStatuses } from './enums';
import { Type } from 'class-transformer';
// Colors
function createStatusColors() {
 let result = {};
  result[CompanyStatuses.UNAVALIABLE] = '#ffbe4d';
  result[CompanyStatuses.ACTIVE] = '#85d183';
  result[CompanyStatuses.INACTIVE] = '#fb3a3a';
  return result;
};

function createStatusText() {
 let result = {};
  result[CompanyStatuses.NONE] = 'none';
  result[CompanyStatuses.UNAVALIABLE] = 'unavaliable';
  result[CompanyStatuses.ACTIVE] = 'active';
  result[CompanyStatuses.INACTIVE] = 'inactive';
  return result;
};

function createTypeText() {
 let result = {};
  result[CompanyTypes.BROKER] = 'Broker';
  result[CompanyTypes.FREIGHT_FORWARDER] = 'Freight Forwarder';
  result[CompanyTypes.SHIPPER] = 'Shipper';
  result[CompanyTypes.CARRIER] = 'Carrier';
  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const typeText = createTypeText();

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
    result.status = CompanyStatuses.INACTIVE;
    result.type = CompanyTypes.BROKER;
    return result;
  }

  public static getStatusColor(status: CompanyStatuses): string {
    return statusColors[status];
  }

  public static getTypeText (type: CompanyTypes): string {
    return typeText[type];
  }

  static getStatusText(status: CompanyStatuses) {
    return statusText[status];
  }

  constructor() {
    this.locations = new Array<Location>();
    this.contacts = new Array<Contact>();
  }
}
