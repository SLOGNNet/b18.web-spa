import { Facility } from './facility';
import { TripStop } from './tripStop';
import { generateNewId } from './utils';
import { StopTypes, StopStatuses } from './enums';
import { StopAction, stopActionSchema } from './stopAction';
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
  type: StopTypes = StopTypes.NONE;
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

  static create(type: StopTypes): Stop{
    const result = new Stop();
    result.id = generateNewId();
    result.arrivedAt = new Date();
    result.departedAt = new Date();
    result.plannedArrivalAt = new Date();
    result.plannedDepartureAt = new Date();
    result.type = type;
    result.facility = Facility.create();
    result.tripStops = [];
    return result;
  }

}
