export enum AppointmentTypes {
  NONE = 0,
  FCFS = 1,
  APPT = 2
}

let displayTexts =  {
  [AppointmentTypes.NONE]: 'None',
  [AppointmentTypes.FCFS]: 'FCFS',
  [AppointmentTypes.APPT]: 'APPT'
}

export namespace AppointmentTypes {
  export function displayText(type: AppointmentTypes): string {
    return displayTexts[type];
  }

}
