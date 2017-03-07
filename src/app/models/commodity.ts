import { generateNewId } from './utils';
import { Stop } from './stop';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { StopActionTypes } from './enums';

@JsonObject
export class Commodity {
  @JsonMember
  id: number;
  @JsonMember
  pickupId: number;
  @JsonMember
  dropoffId?: number;
  @JsonMember
  pickupNumber: number;
  @JsonMember
  dropoffNumber: number;
  @JsonMember
  po: string = '';
  @JsonMember
  commodity: string = '';
  @JsonMember
  unitType: string = '';
  @JsonMember
  unitCount: number;
  @JsonMember
  palletCount: number;
  @JsonMember
  weight: number;

  static create(): Commodity{
    const result = new Commodity();
    result.id = generateNewId();
    return result;
  }
}
