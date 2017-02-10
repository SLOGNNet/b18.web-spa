import { Driver } from './driver';
import { PowerUnitTypes,
  TrailerTypes,
  EquipmentTypes,
  EquipmentModes,
  EquipmentStatuses,
  EquipmentDriverType,
  EquipmentVehicleOperatings } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

// Colors
function createStatusColors() {
 let result = {};
  result[EquipmentStatuses.NotAvaliable] = '#ffbe4d';
  result[EquipmentStatuses.Active] = '#85d183';
  result[EquipmentStatuses.Inactive] = '#fb3a3a';

  return result;
};

const statusColors = createStatusColors();

@JsonObject
export class Equipment {
  private static statusText = ['Inactive', 'Active', 'NotAvaliable'];
  private static typeText = ['Trailer', 'PowerUnit'];
  private static shortTypeText = ['TL', 'TK'];
  private static modeText = ['Company'];
  private static equipmentDriverText = ['Company Driver', 'Owner Operator'];
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
  driverFirstName: string = '';
  @JsonMember
  driverLastName: string = '';
  @JsonMember
  status: EquipmentStatuses;
  @JsonMember
  driverType: EquipmentDriverType;
  @JsonMember
  type: EquipmentTypes;
  @JsonMember
  subType: PowerUnitTypes | TrailerTypes;
  @JsonMember
  mode: EquipmentModes;
  @JsonMember
  vehicleOperating: EquipmentVehicleOperatings;
  @JsonMember
  lastTripNumber: number;
  @JsonMember
  lastAddress: string = '';





  static create(): Equipment{
    const result = new Equipment();
    result.status = EquipmentStatuses.Active;
    result.type = EquipmentTypes.Trailer;
    result.subType = TrailerTypes.DryVan53;
    result.mode = EquipmentModes.Company;
    result.vehicleOperating = EquipmentVehicleOperatings.InterState;
    result.driverType = EquipmentDriverType.CompanyDriver;
    return result;
  }


  public static getStatusText(status): string {
    return Equipment.statusText[status];
  }

  public static getDriverText(driverType: EquipmentDriverType): string {
    return Equipment.equipmentDriverText[driverType];
  }

  public static getStatusColor(status: EquipmentStatuses): string {
    return statusColors[status];
  }

  public static getShortTypeText(type): string {
    return Equipment.shortTypeText[type];
  }

  public static getTypeText(type): string {
    return Equipment.typeText[type];
  }

  public static getModeText(type): string {
    return Equipment.modeText[type];
  }
};
