import { Facility } from './facility';
import { TripStop } from './tripStop';
import { generateNewId } from './utils';
import { StopStatuses, ScheduleTypes } from './enums';
import { StopAction, stopActionSchema } from './stopAction';
import { Appointment } from './appointment';
import { Type } from 'class-transformer';
import { schema } from 'normalizr';
import { Commodity, commoditySchema } from './commodity';
export const stopSchema = new schema.Entity('stops', {
  stopActions: [stopActionSchema]
});
export const stopListSchema = [stopSchema];

export class Stop {
  id: string;
  notes: string = '';
  @Type(() => Facility)
  facility: Facility;
  status: StopStatuses.IN_PROGRESS;
  arrivedAt: Date = null;
  departedAt: Date = null;
  plannedArrivalAt: Date = null;
  plannedDepartureAt: Date = null;
  @Type(() => TripStop)
  tripStops: Array<TripStop>;
  @Type(() => StopAction)
  stopActions: Array<StopAction>;
  @Type(() => Appointment)
  appointment: Appointment;
  scheduleType: ScheduleTypes;

  static create(): Stop{
    const result = new Stop();
    result.id = generateNewId();
    result.arrivedAt = new Date();
    result.departedAt = new Date();
    result.plannedArrivalAt = new Date();
    result.plannedDepartureAt = new Date();
    result.facility = Facility.create();
    result.tripStops = [];
    result.stopActions = [];
    result.appointment = Appointment.create();
    return result;
  }

}
