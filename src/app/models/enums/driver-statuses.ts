export enum DriverStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  UNAVALIABLE = 3
}


let displayTexts = {
  [DriverStatuses.NONE]: 'None',
  [DriverStatuses.UNAVALIABLE]: 'Unavaliable',
  [DriverStatuses.ACTIVE]: 'Active',
  [DriverStatuses.INACTIVE]: 'Inactive'
};

let statusColors = {
  [DriverStatuses.UNAVALIABLE]: '#ffbe4d',
  [DriverStatuses.ACTIVE]: '#85d183',
  [DriverStatuses.INACTIVE]: '#fb3a3a'
};

export namespace DriverStatuses {
  export function displayText(status: DriverStatuses) {
    return displayTexts[status];
  }

  export function color(status: DriverStatuses) {
    return statusColors[status];
  }
}
