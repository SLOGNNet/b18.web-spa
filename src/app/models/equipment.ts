import { Address, Contact, PowerUnitTypes, TrailerTypes } from './index';


export enum EquipmentTypes {
  Trailer = 0,
  PowerUnit = 1
};

export enum EquipmentModes {
  Company = 0
};

export enum EquipmentStatuses {
  Inactive = 0,
  Active = 1,
  NotAvaliable = 2
}

export enum EquipmentVehicleOperatings {
  InterState = 0,
  IntraState = 1
}

export class Equipment {
  private static statusText = ['Inactive', 'Active', 'NotAvaliable'];
  private static typeText = ['Trailer', 'PowerUnit'];
  private static modeText = ['Company'];

  id: number = 0;
  make: string = 'x';
  model: string = 'x';
  number: string = 'x';
  vin: string = 'x';
  notes: string = 'x';
  status: EquipmentStatuses;
  type: EquipmentTypes;
  subType: PowerUnitTypes | TrailerTypes;
  mode: EquipmentModes;
  vehicleOperating: EquipmentVehicleOperatings;

  static create(): Equipment{
    const result = new Equipment();
    result.status = EquipmentStatuses.Active;
    result.type = EquipmentTypes.Trailer;
    result.subType = TrailerTypes.DryVan53;
    result.mode = EquipmentModes.Company;
    result.vehicleOperating = EquipmentVehicleOperatings.InterState;
    return result;
  }


  public static getStatusText(status): string {
    return Equipment.statusText[status];
  }

  public static getTypeText(type): string {
    return Equipment.typeText[type];
  }

  public static getModeText(type): string {
    return Equipment.modeText[type];
  }
};
