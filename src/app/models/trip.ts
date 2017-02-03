import { Driver } from './driver';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Trip {
  @JsonMember
  id: number;
  @JsonMember
  number: number = 0;
  @JsonMember
  truckNumber: number = 0;
  @JsonMember
  trailerNumber: number = 0;
  @JsonMember({ elements: Driver })
  driver: Driver;

  static create(): Trip{
    const result = new Trip();
    result.id = generateNewId();
    result.driver = Driver.create();
    return result;
  }
}
