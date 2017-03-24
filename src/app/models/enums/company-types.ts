export enum CompanyTypes {
  BROKER = 1,
  FREIGHT_FORWARDER = 2,
  SHIPPER = 3,
  CARRIER = 4
};

let displayTexts = {
  [CompanyTypes.BROKER]: 'Broker',
  [CompanyTypes.FREIGHT_FORWARDER]: 'Freight Forwarder',
  [CompanyTypes.SHIPPER]: 'Shipper',
  [CompanyTypes.CARRIER]: 'Carrier'
};

export namespace CompanyTypes {
  export function displayText(type: CompanyTypes): string {
    return displayTexts[type];
  }
}
