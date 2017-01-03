import { Customer, Stop, StopTypes } from './index';
import { generateNewId } from './utils';

export enum LoadStatuses {
  Booked = 1,
  Assigned = 2
}

export enum DriverRequirements {
  Solo = 1
};

export enum DataAssigneeRequirements {
  MelMel1 = 1,
  MelMel2 = 2
};

export enum LoadType {
  FTL = 1,
  LTL = 2
};

export enum FreightType {
  Dry = 1,
  Reefer = 2
}

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
  carrierLoadNumber: number;
  brokerLoadNumber: number;
  loadType: LoadType;
  freightType: FreightType;
  dataAssignee: DataAssigneeRequirements;
  billingAddressId: number;
  contactId: number;
  status: LoadStatuses;
  customer: Customer;
  driverRequirment: DriverRequirements;
  powerUnitType: PowerUnitTypes;
  trailerType: TrailerTypes;
  specialRequirment: string;
  pickups: Array<Stop>;
  dropoffs: Array<Stop>;

  static create(): Load{
    const result = new Load();
    result.id = generateNewId();
    result.status = LoadStatuses.Booked;
    result.customer = Customer.create();
    result.driverRequirment = DriverRequirements.Solo;
    result.powerUnitType = PowerUnitTypes.Tractor;
    result.trailerType = TrailerTypes.DryVan53;
    result.pickups = [Stop.create(StopTypes.Pickup)];
    result.dropoffs = [Stop.create(StopTypes.Dropoff)];

    return result;
  }
}
