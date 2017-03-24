export enum EquipmentTypes {
  NONE = 0,
  TRAILER = 1,
  POWER_UNIT = 2
};

let displayShortTexts = {
  [EquipmentTypes.NONE]: 'None',
  [EquipmentTypes.TRAILER]: 'TL',
  [EquipmentTypes.POWER_UNIT]: 'TK'
};

let displayTexts = {
  [EquipmentTypes.NONE]: 'None',
  [EquipmentTypes.TRAILER]: 'Trailer',
  [EquipmentTypes.POWER_UNIT]: 'PowerUnit'
};

export namespace EquipmentTypes {
  export function displayText(type: EquipmentTypes) {
    return displayTexts[type];
  }

  export function displayShortText(type: EquipmentTypes) {
    return displayShortTexts[type];
  }
}
