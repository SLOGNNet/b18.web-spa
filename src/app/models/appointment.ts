import { AppointmentTypes } from './enums';

export class Appointment {
  from: Date;
  to: Date;
  type: AppointmentTypes;

  static create(): Appointment{
    const result = new Appointment();
    return result;
  }
}
