import { Facility } from './facility';
import { StopAction } from './stopAction';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { Appointment } from './appointment';
import { Commodity } from './commodity';
import { generateNewId } from './utils';
import { StopActionTypes } from './enums';

@JsonObject
export class TripStop {
  @JsonMember
  id: number;
  @JsonMember
  notes: string = '';
  @JsonMember({ elements: Facility })
  facility: Facility;
  @JsonMember({ elements: StopAction })
  stopActions: Array<StopAction>;
  @JsonMember({ elements: Appointment })
  appointment: Appointment;

  static create(): TripStop{
    const result = new TripStop();
    result.id = generateNewId();
    result.facility = Facility.create();
    result.stopActions = [];
    return result;
  }
}
