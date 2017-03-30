export enum TrailerTypes {
  DRY_VAN_53 = 1,
  REEFER = 2,
  DRY_VAN_48 = 3,
  REEFER_48 = 4,
  FLAT_BED_53 = 5,
  OTHER = 6,
};

const displayTexts = {};
displayTexts[TrailerTypes.DRY_VAN_53] = 'Dry Van 53\'';
displayTexts[TrailerTypes.REEFER] = 'Reefer 53\'';
displayTexts[TrailerTypes.DRY_VAN_48] = 'Dry Van 48\'';
displayTexts[TrailerTypes.REEFER_48] = 'Reefer 48\'';
displayTexts[TrailerTypes.FLAT_BED_53] = 'Flat Bed 53\'';
displayTexts[TrailerTypes.OTHER] = 'Other\'';

export namespace TrailerTypes {
  export function displayText(tType: TrailerTypes) {
    return displayTexts[tType];
  }
}
