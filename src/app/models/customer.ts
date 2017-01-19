import { Address } from './index';
import { Contact } from './index';
import { Load } from './index';
import { generateNewId } from './utils';

export enum CustomerTypes {
  Broker = 1,
  FreightForwarder = 2,
  Shipper = 3,
  Carrier = 4
};

export enum CustomerStatuses {
  Inactive = 0,
  Active = 1,
  Unavaliable = 2
}

// Colors
function createStatusColors() {
 let result = {};
  result[CustomerStatuses.Unavaliable] = '#ffbe4d';
  result[CustomerStatuses.Active] = '#85d183';
  result[CustomerStatuses.Inactive] = '#fb3a3a';
  return result;
};

const statusColors = createStatusColors();

export class Customer {
  private static statusText = ['Inactive', 'Active', 'Unavaliable'];

  id: number;
  name: string = '';
  contacts: Array<Contact>;
  status: CustomerStatuses;
  type: CustomerTypes;
  mc: string = '';
  taxId: string = '';
  addresses: Array<Address>;
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
