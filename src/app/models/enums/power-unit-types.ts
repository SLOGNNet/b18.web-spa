export enum PowerUnitTypes {
  TRACTOR = 1,
  STRAIGHT_TRUCK_25 = 2,
  STRAIGHT_TRUCK_FLATBED = 3,
  BUS = 4,
  OTHER = 5
};

const displayTexts = {};
displayTexts[PowerUnitTypes.TRACTOR] = 'Tractor';
displayTexts[PowerUnitTypes.STRAIGHT_TRUCK_25] = 'Straight Truck 25\'';
displayTexts[PowerUnitTypes.STRAIGHT_TRUCK_FLATBED] = 'Straight Truck Flatbed';
displayTexts[PowerUnitTypes.BUS] = 'Bus';
displayTexts[PowerUnitTypes.OTHER] = 'Other';

export namespace PowerUnitTypes {
  export function displayText(puType: PowerUnitTypes) {
    return displayTexts[puType];
  }
}
