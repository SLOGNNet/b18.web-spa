import { Commodity, commoditySchema } from './commodity';
import { StopActionTypes } from './enums';
import { Type } from 'class-transformer';
import { schema } from 'normalizr';
import { generateNewId } from './utils';

export const stopActionSchema = new schema.Entity('stopActions', {
  commodities: [commoditySchema]
});

export class StopAction {
  id: string;
  @Type(() => Commodity)
  commodities: Array<Commodity>;
  type: StopActionTypes;
  static create(type: StopActionTypes): StopAction{
    const result = new StopAction();
    result.id = generateNewId();
    result.commodities = [];
    return result;
  }
}
