export enum ScheduleTypes {
  NONE = 0,
  FCFS = 1,
  APPT = 2
}

let displayTexts =  {
  [ScheduleTypes.NONE]: 'None',
  [ScheduleTypes.FCFS]: 'FCFS',
  [ScheduleTypes.APPT]: 'Appt'
};

export namespace ScheduleTypes {
  export function displayText(type: ScheduleTypes): string {
    return displayTexts[type];
  }

}
