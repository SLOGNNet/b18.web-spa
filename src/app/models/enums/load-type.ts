export enum LoadType {
  FTL = 1,
  LTL = 2
};

let displayTexts = {
  [LoadType.FTL]: 'FTL',
  [LoadType.LTL]: 'LTL'
};

export namespace LoadType {
  export function displayText(priority: LoadType) {
    return displayTexts[priority];
  }
}
