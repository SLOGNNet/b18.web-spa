export enum DriverTypes {
  COMPANY_DRIVER = 1,
  OWNER_OPERATOR = 2
};

let typeText = {};

(() => {
  typeText[DriverTypes.COMPANY_DRIVER] = 'Company driver';
  typeText[DriverTypes.OWNER_OPERATOR] = 'Owner operator';
})();

export namespace DriverTypes {
  export function text(type: DriverTypes) {
    return typeText[type];
  }

  export function texts() {
    return typeText;
  }
}
