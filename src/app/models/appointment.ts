import { AppointmentTypes } from './enums';

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
  from: Date;
  to: Date;
  type: AppointmentTypes;

  static create(): Appointment{
    const result = new Appointment();
    return result;
  }

  public static getAppointmentText(type: AppointmentTypes): string {
    return appointmentTypeText[type];
  }
}
