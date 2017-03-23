export enum StopTypes {
  NONE = 0,
  PICKUP = 1,
  DROPOFF = 2
};

let displayTexts = {
  [StopTypes.NONE]: 'None',
  [StopTypes.PICKUP]: 'Pickup',
  [StopTypes.DROPOFF]: 'Dropoff'
};

export namespace StopTypes {
  export function displayText(type: StopTypes) {
    return displayTexts[type];
  }
}
