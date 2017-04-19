export enum StopActionTypes {
  PICKUP = 1,
  DROPOFF = 2
}

let displayTexts = {
  [StopActionTypes.PICKUP]: 'Pickup',
  [StopActionTypes.DROPOFF]: 'Dropoff'
};

export namespace StopActionTypes {
  export function displayText(type: StopActionTypes) {
    return displayTexts[type];
  }
}