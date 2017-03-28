export enum DriverRequirements {
  SOLO = 1
};

const displayTexts = ['Solo Driver'];
displayTexts[DriverRequirements.SOLO] = 'Solo Driver';

export namespace DriverRequirements {
  export function displayText(requirement: DriverRequirements) {
    return displayTexts[requirement];
  }
}
