import { Customer } from './index';

export enum LoadStatuses {
  Booked = 1,
  Assigned = 2
}

export enum DriverRequirments {
  Tom = 1,
  Harry = 2,
  Mike = 3,
};

export enum PowerUnitTypes {
  Tractor = 1,
  Bus = 2,
  Other = 3,
};

export enum TrailerTypes {
  Reefer = 1,
  DryVan = 2,
  Other = 3,
};

export class Load {
  id: number;
  customerId: number;
  status: LoadStatuses;
  customer: Customer;
  driverRequirment: DriverRequirments;
  powerUnitType: PowerUnitTypes;
  trailerType: TrailerTypes;
  specialRequirment: string;
}
