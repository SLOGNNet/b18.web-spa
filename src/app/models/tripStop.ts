import { Facility } from './facility';
import { StopAction } from './stopAction';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Type } from 'class-transformer';
import { Appointment } from './appointment';
import { Commodity } from './commodity';
import { generateNewId } from './utils';
import { StopActionTypes } from './enums';
import { Trip } from './trip';
@JsonObject
export class TripStop {
  id: number;
  notes: string = '';
  @Type(() => Facility)
  facility: Facility;
  @Type(() => StopAction)
  stopActions: Array<StopAction>;
  @Type(() => Appointment)
  appointment: Appointment;
  @Type(() => Trip)
  trip: Trip;

  static create(): TripStop{
    const result = new TripStop();
    result.id = generateNewId();
    result.facility = Facility.create();
    result.stopActions = [];
    return result;
  }
}
