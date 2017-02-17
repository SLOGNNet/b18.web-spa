import { Stop } from './stop';
import { Company } from './company';
import { Commodity } from './commodity';
import { Trip } from './trip';
import { Document } from './document';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { generateNewId } from './utils';
import { LoadStatuses, StopTypes, DriverRequirements, LoadType, FreightType, PowerUnitTypes, TrailerTypes } from './enums';

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

@JsonObject
export class Load {
  @JsonMember
  id: number;
  @JsonMember
  companyId: number;
  @JsonMember
  addressId: number;
  @JsonMember
  systemLoadNo: number;
  @JsonMember
  customerLoadNo: number;
  @JsonMember
  type: LoadType;
  @JsonMember
  freightType: FreightType;
  @JsonMember
  billingAddressId: number;
  @JsonMember({ elements: Commodity })
  commodities: Array<Commodity>;
  @JsonMember
  contactId: number;
  @JsonMember
  status: LoadStatuses;
  @JsonMember({ elements: Company })
  company: Company;
  @JsonMember
  driverRequirment: DriverRequirements;
  @JsonMember
  requiredPowerUnitType: PowerUnitTypes;
  @JsonMember
  requiredTrailerType: TrailerTypes;
  @JsonMember
  specialRequirments: string;
  @JsonMember({ elements: Trip })
  trips: Array<Trip>;
  @JsonMember({ elements: Trip })
  currentTrip: Array<Trip>;
  @JsonMember({ elements: Stop })
  stops: Array<Stop>;
  @JsonMember({ elements: Document })
  documents: Array<Document>;

  static create(): Load {
    const result = new Load();
    result.id = generateNewId();
    result.status = LoadStatuses.Booked;
    result.company = Company.create();
    result.driverRequirment = DriverRequirements.Solo;
    result.requiredPowerUnitType = PowerUnitTypes.Tractor;
    result.requiredTrailerType = TrailerTypes.DryVan53;
    result.trips = [Trip.create()];
    result.currentTrip = [Trip.create()];
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
}
