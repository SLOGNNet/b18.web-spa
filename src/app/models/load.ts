import { Customer, Stop, StopTypes, Trip, Document } from './index';
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
function createStatusColors() {
 let result = {};
  result[LoadStatuses.Pending] = result[LoadStatuses.Booked] = result[LoadStatuses.Scheduled] = '#75b3e1';
  result[LoadStatuses.EnRoute] = result[LoadStatuses.InTransit] = '#ffbe4d';
  result[LoadStatuses.Delivered] = result[LoadStatuses.Completed] = '#85d183';
  result[LoadStatuses.Canceled] = '#fb3a3a';

  return result;
};

const statusColors = createStatusColors();

// Texts
function createStatusTexts() {
 let result = {};
  result[LoadStatuses.Booked] = 'booked';
  result[LoadStatuses.Assigned] = 'assigned';
  result[LoadStatuses.Pending] = 'pending';
  result[LoadStatuses.Scheduled] = 'scheduled';
  result[LoadStatuses.EnRoute] = 'en route';
  result[LoadStatuses.InTransit] = 'in-transit';
  result[LoadStatuses.Delivered] = 'delivered';
  result[LoadStatuses.Completed] = 'completed';
  result[LoadStatuses.Canceled] = 'canceled';

  return result;
};

const statusTexts = createStatusTexts();

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
  documents: Array<Document>;

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
    result.documents = [];

    return result;
  }

  public static getStatusColor(status: LoadStatuses): string {
    return statusColors[status];
  }

  public static getStatusText(status: LoadStatuses): string {
    return statusTexts[status];
  }
}
