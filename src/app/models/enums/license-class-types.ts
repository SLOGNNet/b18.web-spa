export enum LicenseClassTypes {
  NONE = 0,
  CLASS_A = 1,
  CLASS_B = 2,
  CLASS_C = 3
};

let displayTexts = {
  [LicenseClassTypes.NONE]: 'None',
  [LicenseClassTypes.CLASS_A]: 'Class A',
  [LicenseClassTypes.CLASS_B]: 'Class B',
  [LicenseClassTypes.CLASS_C]: 'Class C'
};

export namespace LicenseClassTypes {
  export function displayText(type: LicenseClassTypes) {
    return displayTexts[type];
  }
}
