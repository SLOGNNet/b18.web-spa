import { AppointmentType } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Appointment {
  @JsonMember
  from: Date;
  @JsonMember
  to: Date;
  @JsonMember
  type: AppointmentType;

  static create(): Appointment{
    const result = new Appointment();
    return result;
  }
}
