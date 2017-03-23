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

  public static getSelectedContact(contacts: Contact[], id: string): Contact {
    let result = null;
    result = contacts.find(c => c.id === id);
    return result;
  }
}
