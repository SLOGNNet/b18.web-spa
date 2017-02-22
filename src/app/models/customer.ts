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

const statusColors = createStatusColors();
@JsonObject()
export class Customer {
  private static statusText = ['inactive', 'active', 'unavaliable'];

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

  static getStatusText(status) {
    return Customer.statusText[status];
  }

  constructor() {
    this.addresses = new Array<Address>();
    this.contacts = new Array<Contact>();
  }
}
