export enum DriverPaymentOptions {
  PER_MILE = 1,
  PERCENTAGE = 2,
  HOURLY = 3,
  FLAT = 4
}

let options = {};

(() => {
  options[DriverPaymentOptions.PER_MILE] = 'Per Miles';
  options[DriverPaymentOptions.PERCENTAGE] = 'Percentage';
  options[DriverPaymentOptions.HOURLY] = 'Hourly';
  options[DriverPaymentOptions.FLAT] = 'Flat';
})();

export namespace DriverPaymentOptions {
  export function text(option: DriverPaymentOptions) {
    return options[option];
  }
}
