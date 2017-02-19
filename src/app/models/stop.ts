import { Facility } from './facility';
import { generateNewId } from './utils';
import { StopTypes, StopStatuses } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

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

  @JsonMember
  id: number;
  @JsonMember
  notes: string = '';
  @JsonMember
  type: StopTypes = StopTypes.None;
  @JsonMember({ elements: Facility })
  facility: Facility;
  @JsonMember
  status: StopStatuses.InProgress;
  @JsonMember
  arrivedAt: Date = null;
  @JsonMember
  departedAt: Date = null;
  @JsonMember
  plannedArrivalAt: Date = null;
  @JsonMember
  plannedDepartureAt: Date = null;

  static create(type: StopTypes): Stop{
    const result = new Stop();
    result.id = generateNewId();
    result.arrivedAt = new Date();
    result.departedAt = new Date();
    result.plannedArrivalAt = new Date();
    result.plannedDepartureAt = new Date();
    result.type = type;
    result.facility = Facility.create();
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
