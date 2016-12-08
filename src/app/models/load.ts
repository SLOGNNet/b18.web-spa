import { Customer } from './index';

export enum LoadStatuses {
  Booked = 1,
  Assigned = 2
}

export class Load {
  id: number;
  customerId: number;
  status: LoadStatuses;
  customer: Customer;
}
