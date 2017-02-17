import { Driver } from './driver';
import { DriverTeam } from './driverTeam';
import { Equipment } from './equipment';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Trip {
  @JsonMember
  id: number;
  @JsonMember
  number: number = 0;
  @JsonMember
  truckEquipment: Equipment;
  @JsonMember
  trailerEquipment: Equipment;
  @JsonMember({ elements: DriverTeam })
  driverTeams: Array<DriverTeam>;

  static create(): Trip{
    const result = new Trip();
    result.id = generateNewId();
    return result;
  }
}
