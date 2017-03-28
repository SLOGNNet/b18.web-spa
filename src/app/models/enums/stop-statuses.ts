export enum StopStatuses {
  NONE = 0,
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  PROBLEM = 4
};


let displayTexts = {
  [StopStatuses.NONE]: 'None',
  [StopStatuses.COMPLETED]: 'Complete',
  [StopStatuses.IN_PROGRESS]: 'In progress',
  [StopStatuses.PROBLEM]: 'Problem',
  [StopStatuses.PENDING]: 'Pending'
};

let statusColors = {
  [StopStatuses.COMPLETED]: '#ffbe4d',
  [StopStatuses.IN_PROGRESS]: '#85d183',
  [StopStatuses.PROBLEM]: '#fb3a3a',
  [StopStatuses.PENDING]: '#75b3e1'
};

export namespace StopStatuses {
  export function displayText(status: StopStatuses) {
    return displayTexts[status];
  }

  export function color(status: StopStatuses) {
    return statusColors[status];
  }
}
