export enum CompanyStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  UNAVALIABLE = 3
}

let statusColors = {
  [CompanyStatuses.UNAVALIABLE]: '#ffbe4d',
  [CompanyStatuses.ACTIVE]: '#85d183',
  [CompanyStatuses.INACTIVE]: '#fb3a3a'
};

let displayTexts = {
  [CompanyStatuses.NONE]: 'None',
  [CompanyStatuses.UNAVALIABLE]: 'Unavaliable',
  [CompanyStatuses.ACTIVE]: 'Active',
  [CompanyStatuses.INACTIVE]: 'Inactive'
};

export namespace CompanyStatuses {
  export function displayText(status: CompanyStatuses) {
    return displayTexts[status];
  }

  export function color(status: CompanyStatuses) {
    return statusColors[status];
  }
}
