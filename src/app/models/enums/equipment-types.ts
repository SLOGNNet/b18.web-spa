export enum EquipmentTypes {
  POWER_UNIT = 1,
  TRAILER = 2
};

let displayShortTexts = {
  [EquipmentTypes.POWER_UNIT]: 'TK',
  [EquipmentTypes.TRAILER]: 'TL'
};

let displayTexts = {
  [EquipmentTypes.POWER_UNIT]: 'Power Unit',
  [EquipmentTypes.TRAILER]: 'Trailer'
};

export namespace EquipmentTypes {
  export function displayText(type: EquipmentTypes) {
    return displayTexts[type];
  }

  export function displayShortText(type: EquipmentTypes) {
    return displayShortTexts[type];
  }
}
