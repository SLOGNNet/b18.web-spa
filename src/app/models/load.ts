import { Stop } from './stop';
import { Company } from './company';
import { Commodity } from './commodity';
import { Location } from './location';
import { Contact } from './contact';
import { Trip } from './trip';
import { Document } from './document';
import { generateNewId } from './utils';
import { LoadStatuses, StopTypes, DriverRequirements, LoadType, FreightType, PowerUnitTypes, TrailerTypes } from './enums';
import { Type } from 'class-transformer';


// driver requirements
const driverRequirements = ['Solo Driver'];
driverRequirements[DriverRequirements.SOLO] = 'Solo Driver';

// power unit types
const powerUnitTypes = {};
powerUnitTypes[PowerUnitTypes.TRACTOR] = 'Tractor';
powerUnitTypes[PowerUnitTypes.STRAIGHT_TRUCK_25] = 'Straight Truck 25';
powerUnitTypes[PowerUnitTypes.STRAIGHT_TRUCK_FLATBED] = 'Straight Truck Flatbed';
powerUnitTypes[PowerUnitTypes.BUS] = 'Bus';
powerUnitTypes[PowerUnitTypes.OTHER] = 'Other';


// freight types
const freightTypes = {};
freightTypes[FreightType.DRY] = 'Dry';
freightTypes[FreightType.REEFER] = 'Reefer';

// trailer types
const trailerTypes = {};
trailerTypes[TrailerTypes.DRY_VAN_53] = 'Dry Van 53';
trailerTypes[TrailerTypes.REEFER] = 'Reefer';
trailerTypes[TrailerTypes.DRY_VAN_48] = 'Dry Van 48';
trailerTypes[TrailerTypes.REEFER_48] = 'Reefer 48';
trailerTypes[TrailerTypes.FLAT_BED_53] = 'Flat Bed 53';
trailerTypes[TrailerTypes.OTHER] = 'Other';

// Colors
function createStatusColors() {
 let result = {};
  result[LoadStatuses.PENDING] = result[LoadStatuses.BOOKED] = result[LoadStatuses.SCHEDULED] = '#75b3e1';
  result[LoadStatuses.EN_ROUTE] = result[LoadStatuses.IN_TRANSIT] = '#ffbe4d';
  result[LoadStatuses.DELIVERED] = result[LoadStatuses.COMPLETED] = '#85d183';
  result[LoadStatuses.CANCELED] = '#fb3a3a';

  return result;
};

const statusColors = createStatusColors();

// Texts
function createStatusTexts() {
 let result = {};
  result[LoadStatuses.BOOKED] = 'booked';
  result[LoadStatuses.ASSIGNED] = 'assigned';
  result[LoadStatuses.PENDING] = 'pending';
  result[LoadStatuses.SCHEDULED] = 'scheduled';
  result[LoadStatuses.EN_ROUTE] = 'en route';
  result[LoadStatuses.IN_TRANSIT] = 'in-transit';
  result[LoadStatuses.DELIVERED] = 'delivered';
  result[LoadStatuses.COMPLETED] = 'completed';
  result[LoadStatuses.CANCELED] = 'canceled';

  return result;
};

const statusTexts = createStatusTexts();

export class Load {
  id: string;
  companyId: string;
  systemLoadNo: string;
  customerLoadNo: string;
  type: LoadType;
  freightType: FreightType;
  customerBillingLocationId: string;
  @Type(() => Location)
  customerLocation: Location = new Location();
  @Type(() => Location)
  customerBillingLocation: Location;
  @Type(() => Commodity)
  commodities: Array<Commodity>;
  contactId: string;
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
    result.status = LoadStatuses.BOOKED;
    result.customer = Company.create();
    result.driverRequirment = DriverRequirements.SOLO;
    result.requiredPowerUnitType = PowerUnitTypes.TRACTOR;
    result.requiredTrailerType = TrailerTypes.DRY_VAN_53;
    result.trips = [Trip.create()];
    result.currentTrips = [Trip.create()];
    result.stops = [Stop.create(StopTypes.DROPOFF)];
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

  public static getSelectedContact(contacts: Contact[], id: string): Contact {
    let result = null;
    result = contacts.find(c => c.id === id);
    return result;
  }
}
