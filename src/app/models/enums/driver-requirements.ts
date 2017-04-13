export enum DriverRequirements {
  SOLO = 1,
  TEAM = 2
};

const displayTexts = {
  [DriverRequirements.SOLO]: 'Solo',
  [DriverRequirements.TEAM]: 'Team'
};

export namespace DriverRequirements {
  export function displayText(requirement: DriverRequirements) {
    return displayTexts[requirement];
  }
}
