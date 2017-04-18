import { ScheduleTypes } from './enums';

export class Appointment {
  number: string;
  from: Date;
  to: Date;
  scheduleType: ScheduleTypes;

  static create(): Appointment{
    const result = new Appointment();
    return result;
  }
}
