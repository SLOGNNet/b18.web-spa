export enum LicenseClassTypes {
  NONE = 0,
  CLASS_A = 1,
  CLASS_B = 2,
  CLASS_C = 3
};

let types = {};

(() => {
  types[LicenseClassTypes.NONE] = 'None';
  types[LicenseClassTypes.CLASS_A] = 'Class A';
  types[LicenseClassTypes.CLASS_B] = 'Class B';
  types[LicenseClassTypes.CLASS_C] = 'Class C';
})();

export namespace LicenseClassTypes {
  export function text(type: LicenseClassTypes) {
    return types[type];
  }
}
