export enum ReeferType {
  CONTINUOUS = 1,
  CYCLE = 2
}

const displayTexts = {};
displayTexts[ReeferType.CONTINUOUS] = 'Continuous';
displayTexts[ReeferType.CYCLE] = 'Cycle';

export namespace ReeferType {
  export function displayText(rType: ReeferType) {
    return displayTexts[rType];
  }
}
