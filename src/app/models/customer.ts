import { Address } from './index';

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
  name: string;
  status: CustomerStatuses;
  type: CustomerTypes;
  mc: string;
  taxId: string;
  address: Address;
  billingAddresses: Address;
  email: string;

  static create(): Customer{
    const result = new Customer();
    result.status = CustomerStatuses.Inactive;
    return result;
  }

  constructor() {
    this.address = new Address();
  }

}
