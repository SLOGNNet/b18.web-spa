export enum EquipmentModes {
  NONE = 0,
  COMPANY = 1,
  OWNER_OPERATOR = 2
};

let displayTexts = {
  [EquipmentModes.NONE]: 'None',
  [EquipmentModes.COMPANY]: 'Company',
  [EquipmentModes.OWNER_OPERATOR]: 'Owner Operator'
};

export namespace EquipmentModes {
  export function displayText(type: EquipmentModes): string {
    return displayTexts[type];
  }
}
