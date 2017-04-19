export enum DriverPaymentOptions {
  PER_MILE = 1,
  PERCENTAGE = 2,
  HOURLY = 3,
  FLAT = 4
}

let displayTexts = {
  [DriverPaymentOptions.PER_MILE]: 'Per Mile',
  [DriverPaymentOptions.PERCENTAGE]: 'Percentage',
  [DriverPaymentOptions.HOURLY]: 'Hourly',
  [DriverPaymentOptions.FLAT]: 'Flat'
};

export namespace DriverPaymentOptions {
  export function displayText(option: DriverPaymentOptions) {
    return displayTexts[option];
  }
}
