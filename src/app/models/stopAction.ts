import { Facility } from './facility';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Commodity } from './commodity';
import { StopActionTypes } from './enums';
import { Type } from 'class-transformer';

@JsonObject
export class StopAction {
  @Type(() => Commodity)
  commodity: Commodity;
  type: StopActionTypes;
  static create(): StopAction{
    const result = new StopAction();
    result.commodity = Commodity.create();
    return result;
  }
}
