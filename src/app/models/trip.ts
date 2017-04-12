import { DriverTeam } from './driverTeam';
import { Equipment } from './equipment';
import { generateNewId } from './utils';
import { Type } from 'class-transformer';
import { schema } from 'normalizr';

export const tripSchema = new schema.Entity('trips');
export const tripListSchema = [tripSchema];

export class Trip {
  id: string;
  number: string = '';
  @Type(() => Equipment)
  truck: Equipment;
  @Type(() => Equipment)
  trailer: Equipment;
  @Type(() => DriverTeam)
  driverTeams: Array<DriverTeam>;

  static create(): Trip{
    const result = new Trip();
    result.id = generateNewId();
    return result;
  }
}
