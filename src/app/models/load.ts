import { Customer, Stop, StopTypes, Trip } from './index';
import { generateNewId } from './utils';

export enum LoadStatuses {
  Booked = 1,
  Assigned = 2,
  Pending = 3,
  Scheduled = 4,
  EnRoute = 5,
  InTransit = 6,
  Delivered = 7,
  Completed = 8,
  Canceled = 9,
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

// Colors
const statusColors = [{
  keys: [LoadStatuses.Pending, LoadStatuses.Booked, LoadStatuses.Scheduled],
  value: '#75b3e1'
}, {
  keys: [LoadStatuses.EnRoute, LoadStatuses.InTransit],
  value: '#ffbe4d'
}, {
  keys: [LoadStatuses.Delivered, LoadStatuses.Completed],
  value: '#85d183'
}, {
  keys: [LoadStatuses.Canceled],
  value: '#fb3a3a'
}];

// Texts
const statusTexts = [{
  keys: [LoadStatuses.Booked],
  value: 'booked'
}, {
  keys: [LoadStatuses.Assigned],
  value: 'assigned'
}, {
  keys: [LoadStatuses.Pending],
  value: 'pending'
}, {
  keys: [LoadStatuses.Scheduled],
  value: 'scheduled'
}, {
  keys: [LoadStatuses.EnRoute],
  value: 'en route'
}, {
  keys: [LoadStatuses.InTransit],
  value: 'in-transit'
}, {
  keys: [LoadStatuses.Delivered],
  value: 'delivered'
}, {
  keys: [LoadStatuses.Completed],
  value: 'completed'
}, {
  keys: [LoadStatuses.Canceled],
  value: 'canceled'
}];

function getValueByKey(items, key) {
  return items.reduce((p, n) => {
    if (n.keys.indexOf(key) !== -1) {
      p = n.value;
    }

    return p;
  }, '');
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
  trips: Array<Trip>;
  currentTrip: Trip;
  stops: Array<Stop>;

  static create(): Load {
    const result = new Load();
    result.id = generateNewId();
    result.status = LoadStatuses.Booked;
    result.customer = Customer.create();
    result.driverRequirment = DriverRequirements.Solo;
    result.powerUnitType = PowerUnitTypes.Tractor;
    result.trailerType = TrailerTypes.DryVan53;
    result.trips = [Trip.create()];
    result.currentTrip = Trip.create();
    result.stops = [Stop.create(StopTypes.Dropoff)];

    return result;
  }

  public static getStatusColor(status: LoadStatuses): string {
    return getValueByKey(statusColors, status);
  }

  public static getStatusText(status: LoadStatuses): string {
    return getValueByKey(statusTexts, status);
  }
}
