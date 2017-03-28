export enum FreightType {
  DRY = 1,
  REEFER = 2
}

const displayTexts = {};
displayTexts[FreightType.DRY] = 'Dry';
displayTexts[FreightType.REEFER] = 'Reefer';

export namespace FreightType {
  export function displayText(fType: FreightType) {
    return displayTexts[fType];
  }
}
