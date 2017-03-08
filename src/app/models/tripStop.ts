import { Facility } from './facility';
import { StopAction } from './stopAction';
import { Type } from 'class-transformer';
import { Appointment } from './appointment';
import { Commodity } from './commodity';
import { generateNewId } from './utils';
import { StopActionTypes } from './enums';
import { Trip } from './trip';

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
