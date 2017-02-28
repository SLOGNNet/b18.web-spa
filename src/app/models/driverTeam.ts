import { Driver } from './driver';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class DriverTeam {

  @JsonMember
  id: number = 0;
  @JsonMember({ elements: Driver })
  drivers: Array<Driver>;

  static create(): DriverTeam {
    const result = new DriverTeam();
    result.id = generateNewId();
    return result;
  }
};
