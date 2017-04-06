export enum CompanyStatuses {
  ACTIVE= 1,
  INACTIVE = 2,
  UNAVAILABLE = 3
}

let statusColors = {
  [CompanyStatuses.UNAVAILABLE]: '#ffbe4d',
  [CompanyStatuses.ACTIVE]: '#85d183',
  [CompanyStatuses.INACTIVE]: '#fb3a3a'
};

let displayTexts = {
  [CompanyStatuses.UNAVAILABLE]: 'Unavailable',
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
