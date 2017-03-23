export enum DriverStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  UNAVALIABLE = 3
}

let statusText = {};
let statusColor = {};

(() => {
  statusText[DriverStatuses.NONE] = 'None';
  statusText[DriverStatuses.UNAVALIABLE] = 'Unavaliable';
  statusText[DriverStatuses.ACTIVE] = 'Active';
  statusText[DriverStatuses.INACTIVE] = 'Inactive';

  statusColor[DriverStatuses.UNAVALIABLE] = '#ffbe4d';
  statusColor[DriverStatuses.ACTIVE] = '#85d183';
  statusColor[DriverStatuses.INACTIVE] = '#fb3a3a';
})();

export namespace DriverStatuses {
  export function text(status: DriverStatuses) {
    return statusText[status];
  }

  export function color(status: DriverStatuses) {
    return statusColor[status];
  }
}
