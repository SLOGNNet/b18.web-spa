import { Facility } from './facility';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Commodity } from './commodity';
import { StopActionTypes } from './enums';

@JsonObject
export class StopAction {
  @JsonMember({ elements: Commodity })
  commodity: Commodity;
  @JsonMember
  type: StopActionTypes;
  static create(): StopAction{
    const result = new StopAction();
    result.commodity = Commodity.create();
    return result;
  }
}
