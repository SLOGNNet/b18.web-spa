import { Stop, stopSchema } from './stop';
import { Company, companySchema } from './company';
import { Commodity, commoditySchema } from './commodity';
import { Location } from './location';
import { Contact } from './contact';
import { Trip } from './trip';
import { Document } from './document';
import { generateNewId } from './utils';
import { LoadStatuses, StopTypes, DriverRequirements, LoadType, FreightType, PowerUnitTypes, TrailerTypes, ReeferType } from './enums';
import { Type, Transform, Expose } from 'class-transformer';
import { schema } from 'normalizr';

export const loadSchema = new schema.Entity('loads', {
  stops: [stopSchema],
  commodities: [commoditySchema]
});
export const loadListSchema = [loadSchema];

export class Load {
  id: string;
  companyId: string;
  systemLoadNo: string;
  customerLoadNo: string;
  type: LoadType;
  freightType: FreightType;
  reeferType: ReeferType;
  temperature: string;
  customerLocationId: string;
  customerBillingLocationId: string;
  @Type(() => Location)
  customerLocation: Location;
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
    result.trips = [];
    result.currentTrips = [];
    result.stops = [];
    result.documents = [];
    result.commodities = [];

    return result;
  }

  public static getSelectedContact(contacts: Contact[], id: string): Contact {
    let result = null;
    result = contacts.find(c => c.id === id);
    return result;
  }
}
