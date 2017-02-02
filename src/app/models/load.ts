import { Customer, Stop, StopTypes, Trip, Document } from './index';
import { generateNewId } from './utils';
import { LoadStatuses, DriverRequirements, DataAssigneeRequirements, LoadType, FreightType, PowerUnitTypes, TrailerTypes } from './enums';

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
