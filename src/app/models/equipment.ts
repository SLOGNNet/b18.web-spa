import { Address, Contact, PowerUnitTypes, TrailerTypes } from './index';
import { EquipmentTypes, EquipmentModes, EquipmentStatuses, EquipmentVehicleOperatings } from './enums';

export class Equipment {
  private static statusText = ['Inactive', 'Active', 'NotAvaliable'];
  private static typeText = ['Trailer', 'PowerUnit'];
  private static modeText = ['Company'];

  id: number = 0;
  make: string = '';
  model: string = '';
  number: string = '';
  vin: string = '';
  notes: string = '';
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
