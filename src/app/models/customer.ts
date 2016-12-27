import { Address } from './index';
import { Contact } from './index';

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

export class Customer {
  id: number;
  name: string = '';
  contacts: Array<Contact>;
  status: CustomerStatuses;
  type: CustomerTypes;
  mc: string = '';
  taxId: string = '';
  addresses: Array<Address>;
  email: string = '';

  static create(): Customer{
    const result = new Customer();
    result.status = CustomerStatuses.Inactive;
    result.type = CustomerTypes.Broker;
    return result;
  }

  constructor() {
    this.addresses = new Array<Address>();
    this.contacts = new Array<Contact>();
  }
}
