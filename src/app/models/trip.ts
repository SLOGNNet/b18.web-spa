import { Driver } from './driver';
import { DriverTeam } from './driverTeam';
import { Equipment } from './equipment';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Type } from 'class-transformer';

@JsonObject
export class Trip {
  id: number;
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
