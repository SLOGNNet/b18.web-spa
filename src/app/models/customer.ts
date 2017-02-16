import { Address } from './address';
import { Contact } from './contact';
import { Load } from './load';
import { generateNewId } from './utils';
import { CustomerTypes, CustomerStatuses } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
// Colors
function createStatusColors() {
 let result = {};
  result[CustomerStatuses.Unavaliable] = '#ffbe4d';
  result[CustomerStatuses.Active] = '#85d183';
  result[CustomerStatuses.Inactive] = '#fb3a3a';
  return result;
};

function createStatusText() {
 let result = {};
  result[CustomerStatuses.Unavaliable] = 'Unavaliable';
  result[CustomerStatuses.Active] = 'Active';
  result[CustomerStatuses.Inactive] = 'Inactive';
  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();

@JsonObject()
export class Customer {

  id: number;

  name: string = '';
  @JsonMember({ elements: Contact })
  contacts: Contact[];
  @JsonMember
  status: CustomerStatuses;
  @JsonMember
  type: CustomerTypes;
  @JsonMember
  mc: string = '';
  @JsonMember
  taxId: string = '';
  @JsonMember({ elements: Address })
  addresses: Array<Address>;
  @JsonMember
  email: string = '';
  loads: Array<Load>;

  static create(): Customer{
    const result = new Customer();
    result.id = generateNewId();
    result.status = CustomerStatuses.Inactive;
    result.type = CustomerTypes.Broker;
    return result;
  }

  public static getStatusColor(status: CustomerStatuses): string {
    return statusColors[status];
  }

  static getStatusText(status: CustomerStatuses) {
    return statusText[status];
  }

  constructor() {
    this.addresses = new Array<Address>();
    this.contacts = new Array<Contact>();
  }
}
