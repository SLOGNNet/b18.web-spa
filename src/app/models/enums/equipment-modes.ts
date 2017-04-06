export enum EquipmentModes {
  COMPANY = 1,
  OWNER_OPERATOR = 2
};

let displayTexts = {
  [EquipmentModes.COMPANY]: 'Company',
  [EquipmentModes.OWNER_OPERATOR]: 'Owner Operator'
};

export namespace EquipmentModes {
  export function displayText(type: EquipmentModes): string {
    return displayTexts[type];
  }
}
