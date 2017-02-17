import { Driver } from './driver';
import { PowerUnitTypes,
  TrailerTypes,
  EquipmentTypes,
  EquipmentModes,
  EquipmentStatuses,
  DriverTypes,
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

// Status Text
function createStatusText() {
 let result = {};
  result[EquipmentStatuses.NotAvaliable] = 'Not Avaliable';
  result[EquipmentStatuses.Active] = 'Active';
  result[EquipmentStatuses.Inactive] = 'Inactive';

  return result;
};

// Driver Text
function createEquipmentDriverText() {
 let result = {};
  result[DriverTypes.CompanyDriver] = 'Company Driver';
  result[DriverTypes.OwnerOperator] = 'Owner Operator';

  return result;
};

// Type Text
function createTypeText() {
 let result = {};
  result[EquipmentTypes.Trailer] = 'Trailer';
  result[EquipmentTypes.PowerUnit] = 'PowerUnit';

  return result;
};

// Short Type Text
function createShortTypeText() {
 let result = {};
  result[EquipmentTypes.Trailer] = 'TL';
  result[EquipmentTypes.PowerUnit] = 'TK';

  return result;
};

// Mode Text
function createModeText() {
 let result = {};
  result[EquipmentModes.Company] = 'Company';

  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const equipmentDriverText = createEquipmentDriverText();
const typeText = createTypeText();
const shortTypeText = createShortTypeText();
const modeText = createModeText();

@JsonObject
export class Equipment {
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
  driverType: DriverTypes;
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
    result.driverType = DriverTypes.CompanyDriver;
    return result;
  }


  public static getStatusText(status: EquipmentStatuses): string {
    return statusText[status];
  }

  public static getDriverText(driverType: DriverTypes): string {
    return equipmentDriverText[driverType];
  }

  public static getStatusColor(status: EquipmentStatuses): string {
    return statusColors[status];
  }

  public static getShortTypeText(type: EquipmentTypes): string {
    return shortTypeText[type];
  }

  public static getTypeText(type: EquipmentTypes): string {
    return typeText[type];
  }

  public static getModeText(type: EquipmentModes): string {
    return modeText[type];
  }
};
