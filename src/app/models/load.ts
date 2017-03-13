import { Stop } from './stop';
import { Company } from './company';
import { Commodity } from './commodity';
import { Location } from './location';
import { Trip } from './trip';
import { Document } from './document';
import { generateNewId } from './utils';
import { LoadStatuses, StopTypes, DriverRequirements, LoadType, FreightType, PowerUnitTypes, TrailerTypes } from './enums';
import { Type } from 'class-transformer';


// driver requirements
const driverRequirements = ['Solo Driver'];
driverRequirements[DriverRequirements.Solo] = 'Solo Driver';

// power unit types
const powerUnitTypes = {};
powerUnitTypes[PowerUnitTypes.Tractor] = 'Tractor';
powerUnitTypes[PowerUnitTypes.StraightTruck25] = 'Straight Truck 25';
powerUnitTypes[PowerUnitTypes.StraightTruckFlatbed] = 'Straight Truck Flatbed';
powerUnitTypes[PowerUnitTypes.Bus] = 'Bus';
powerUnitTypes[PowerUnitTypes.Other] = 'Other';


// freight types 
const freightTypes = {};
freightTypes[FreightType.Dry] = 'Dry';
freightTypes[FreightType.Reefer] = 'Reefer';

// trailer types 
const trailerTypes = {};
trailerTypes[TrailerTypes.DryVan53] = 'Dry Van 53';
trailerTypes[TrailerTypes.Reefer] = 'Reefer';
trailerTypes[TrailerTypes.DryVan48] = 'Dry Van 48';
trailerTypes[TrailerTypes.Reefer48] = 'Reefer 48';
trailerTypes[TrailerTypes.FlatBed53] = 'Flat Bed 53';
trailerTypes[TrailerTypes.Other] = 'Other';

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
  companyId: number;
  systemLoadNo: string;
  customerLoadNo: string;
  type: LoadType;
  freightType: FreightType;
  customerBillingLocationId: number;
  @Type(() => Location)
  customerLocation: Location = new Location();
  @Type(() => Location)
  customerBillingLocation: Location;
  @Type(() => Commodity)
  commodities: Array<Commodity>;
  contactId: number;
  status: LoadStatuses;
  @Type(() => Company)
  customer: Company;
  driverRequirment: DriverRequirements;
  requiredPowerUnitType: PowerUnitTypes;
  requiredTrailerType: TrailerTypes;
  specialRequirments: string;
  @Type(() => Trip)
  trips: Array<Trip>;
  @Type(() => Trip)
  currentTrips: Array<Trip>;
  @Type(() => Stop)
  stops: Array<Stop>;
  @Type(() => Document)
  documents: Array<Document>;

  static create(): Load {
    const result = new Load();
    result.id = generateNewId();
    result.status = LoadStatuses.Booked;
    result.customer = Company.create();
    result.driverRequirment = DriverRequirements.Solo;
    result.requiredPowerUnitType = PowerUnitTypes.Tractor;
    result.requiredTrailerType = TrailerTypes.DryVan53;
    result.trips = [Trip.create()];
    result.currentTrips = [Trip.create()];
    result.stops = [Stop.create(StopTypes.Dropoff)];
    result.documents = [];
    result.commodities = new Array<Commodity>();

    return result;
  }

  public static getStatusColor(status: LoadStatuses): string {
    return statusColors[status];
  }

  public static getStatusText(status: LoadStatuses): string {
    return statusTexts[status];
  }

  public static getDriverRequirement(requirement: DriverRequirements): string {
    return driverRequirements[requirement];
  }

  public static getPowerUnitType(puType: PowerUnitTypes): string {
    return powerUnitTypes[puType];
  }

  public static getTrailerType(tType: TrailerTypes): string {
    return trailerTypes[tType];
  }

  public static getFreightType(fType: FreightType): string {
    return freightTypes[fType];
  }
}
