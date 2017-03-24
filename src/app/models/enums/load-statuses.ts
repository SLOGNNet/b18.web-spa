export enum LoadStatuses {
  BOOKED = 1,
  ASSIGNED = 2,
  PENDING = 3,
  SCHEDULED = 4,
  EN_ROUTE = 5,
  IN_TRANSIT = 6,
  DELIVERED = 7,
  COMPLETED = 8,
  CANCELED = 9,
}

let displayTexts = {
  [LoadStatuses.BOOKED]: 'Booked',
  [LoadStatuses.ASSIGNED]: 'Assigned',
  [LoadStatuses.PENDING]: 'Pending',
  [LoadStatuses.SCHEDULED]: 'Scheduled',
  [LoadStatuses.EN_ROUTE]: 'En route',
  [LoadStatuses.IN_TRANSIT]: 'In transit',
  [LoadStatuses.DELIVERED]: 'Delivered',
  [LoadStatuses.COMPLETED]: 'Completed',
  [LoadStatuses.CANCELED]: 'Canceled'
};


// Colors
let statusColors = {};
statusColors[LoadStatuses.PENDING] = statusColors[LoadStatuses.BOOKED] = statusColors[LoadStatuses.SCHEDULED] = '#75b3e1';
statusColors[LoadStatuses.EN_ROUTE] = statusColors[LoadStatuses.IN_TRANSIT] = '#ffbe4d';
statusColors[LoadStatuses.DELIVERED] = statusColors[LoadStatuses.COMPLETED] = '#85d183';
statusColors[LoadStatuses.CANCELED] = '#fb3a3a';

export namespace LoadStatuses {
  export function displayText(status: LoadStatuses) {
    return displayTexts[status];
  }

  export function color(status: LoadStatuses) {
    return statusColors[status];
  }
}
