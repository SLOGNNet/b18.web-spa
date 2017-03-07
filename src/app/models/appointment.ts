import { AppointmentTypes } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

const appointmentTypeText = createAppointmentTypes();

function createAppointmentTypes() {
  let result = {};
    result[AppointmentTypes.None] = 'None';
    result[AppointmentTypes.FCFS] = 'FCFS';
    result[AppointmentTypes.APPT] = 'APPT';
  return result;
}

@JsonObject
export class Appointment {
  @JsonMember
  from: Date;
  @JsonMember
  to: Date;
  @JsonMember
  type: AppointmentTypes;

  static create(): Appointment{
    const result = new Appointment();
    return result;
  }

  public static getAppointmentText(type: AppointmentTypes): string {
    return appointmentTypeText[type];
  }
}
