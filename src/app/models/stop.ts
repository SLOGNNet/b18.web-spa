import { Facility } from './facility';
import { TripStop } from './tripStop';
import { Appointment } from './appointment';
import { generateNewId } from './utils';
import { StopTypes, StopStatuses } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Type } from 'class-transformer';

const stopStatusColor = createStopStatusColors();
const stopStatusText = createStopStatusText();
const stopTypeText = createStopTypeText();

// Stop type text
function createStopTypeText() {
 let result = {};
  result[StopTypes.None] = 'None';
  result[StopTypes.Pickup] = 'Pickup';
  result[StopTypes.Dropoff] = 'Dropoff';

  return result;
};

// Stop status text
function createStopStatusText() {
 let result = {};
  result[StopStatuses.None] = 'None';
  result[StopStatuses.Completed] = 'Complete';
  result[StopStatuses.InProgress] = 'In progress';
  result[StopStatuses.Problem] = 'Problem';
  result[StopStatuses.Pending] = 'Pending';

  return result;
};

// Stop status colors
function createStopStatusColors() {
 let result = {};
  result[StopStatuses.Completed] = '#ffbe4d';
  result[StopStatuses.InProgress] = '#85d183';
  result[StopStatuses.Problem] = '#fb3a3a';
  result[StopStatuses.Pending] = '#75b3e1';

  return result;
};

@JsonObject
export class Stop {
  id: number;
  notes: string = '';
  type: StopTypes = StopTypes.None;
  @Type(() => Facility)
  facility: Facility;
  status: StopStatuses.InProgress;
  arrivedAt: Date = null;
  departedAt: Date = null;
  plannedArrivalAt: Date = null;
  plannedDepartureAt: Date = null;
  @Type(() => TripStop)
  tripStops: Array<TripStop>;

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

  public static getStatusColor(status: StopStatuses): string {
    return stopStatusColor[status];
  }

  public static getStatusText(status: StopStatuses): string {
    return stopStatusText[status];
  }

  public static getTypeText(type: StopTypes): string {
    return stopTypeText[type];
  }

}
