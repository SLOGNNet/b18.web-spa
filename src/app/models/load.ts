import { Customer, Stop } from './index';

export enum LoadStatuses {
  Booked = 1,
  Assigned = 2
}

export enum DriverRequirments {
  Solo = 1
};

export enum PowerUnitTypes {
  Tractor = 1,
  StraightTruck25 = 2,
  StraightTruckFlatbed = 3,
  Bus = 4,
  Other = 5
};

export enum TrailerTypes {
  DryVan53 = 1,
  Reefer = 2,
  DryVan48 = 3,
  Reefer48 = 4,
  FlatBed53 = 5,
  Other = 6,
};

export class Load {
  id: number;
  customerId: number;
  addressId: number;
  billingAddressId: number;
  contactsId: number;
  status: LoadStatuses;
  customer: Customer;
  driverRequirment: DriverRequirments;
  powerUnitType: PowerUnitTypes;
  trailerType: TrailerTypes;
  specialRequirment: string;
  stops: Array<Stop>;
}
