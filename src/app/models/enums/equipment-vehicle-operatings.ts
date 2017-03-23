export enum EquipmentVehicleOperatings {
  INTER_STATE = 1,
  INTRA_STATE = 2
}


let displayTexts = {
  [EquipmentVehicleOperatings.INTER_STATE]: 'InterState',
  [EquipmentVehicleOperatings.INTRA_STATE]: 'IntraState'
};

export namespace EquipmentVehicleOperatings {
  export function displayText(type: EquipmentVehicleOperatings) {
    return displayTexts[type];
  }
}
