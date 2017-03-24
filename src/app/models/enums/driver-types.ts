export enum DriverTypes {
  COMPANY_DRIVER = 1,
  OWNER_OPERATOR = 2
};


let displayTexts = {
  [DriverTypes.COMPANY_DRIVER]: 'Company driver',
  [DriverTypes.OWNER_OPERATOR]: 'Owner operator'
};

export namespace DriverTypes {
  export function displayText(type: DriverTypes) {
    return displayTexts[type];
  }
}
