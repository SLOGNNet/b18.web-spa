import { PowerUnitTypes, TrailerTypes, EquipmentTypes, EquipmentModes, EquipmentStatuses, EquipmentVehicleOperatings } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

export class Equipment {
  private static statusText = ['Inactive', 'Active', 'NotAvaliable'];
  private static typeText = ['Trailer', 'PowerUnit'];
  private static modeText = ['Company'];
  @JsonMember
  id: number = 0;
  @JsonMember
  make: string = '';
  @JsonMember
  model: string = '';
  @JsonMember
  number: string = '';
  @JsonMember
  vin: string = '';
  @JsonMember
  notes: string = '';
  @JsonMember
  status: EquipmentStatuses;
  @JsonMember
  type: EquipmentTypes;
  @JsonMember
  subType: PowerUnitTypes | TrailerTypes;
  @JsonMember
  mode: EquipmentModes;
  @JsonMember
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
