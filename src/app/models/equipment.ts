import { Driver } from './driver';
import { Type } from 'class-transformer';
import {
  PowerUnitTypes,
  TrailerTypes,
  EquipmentTypes,
  EquipmentModes,
  EquipmentStatuses,
  DriverTypes,
  EquipmentVehicleOperatings
} from './enums';
import { generateNewId } from './utils';

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
  result[EquipmentStatuses.None] = 'none';
  result[EquipmentStatuses.NotAvaliable] = 'not avaliable';
  result[EquipmentStatuses.Active] = 'active';
  result[EquipmentStatuses.Inactive] = 'inactive';

  return result;
};

// Driver Text
function createEquipmentDriverText() {
  let result = {};
  result[DriverTypes.None] = 'None';
  result[DriverTypes.CompanyDriver] = 'Company Driver';
  result[DriverTypes.OwnerOperator] = 'Owner Operator';

  return result;
};

// Type Text
function createTypeText() {
  let result = {};
  result[EquipmentTypes.None] = 'None';
  result[EquipmentTypes.Trailer] = 'Trailer';
  result[EquipmentTypes.PowerUnit] = 'PowerUnit';

  return result;
};

// Short Type Text
function createShortTypeText() {
  let result = {};
  result[EquipmentTypes.None] = 'None';
  result[EquipmentTypes.Trailer] = 'TL';
  result[EquipmentTypes.PowerUnit] = 'TK';

  return result;
};

// Mode Text
function createModeText() {
  let result = {};
  result[EquipmentModes.None] = 'None';
  result[EquipmentModes.Company] = 'Company';

  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const equipmentDriverText = createEquipmentDriverText();
const typeText = createTypeText();
const shortTypeText = createShortTypeText();
const modeText = createModeText();

export class EquipmentNotification {
  message: string = '';
  date: Date;
}

export class Equipment {
  id: number = 0;
  make: string = 'Kenworth';
  model: string = 'T610';
  number: string = '101';
  vin: string = '';
  notes: string = 'Oil Change';
  @Type(() => Driver)
  driver: Driver;
  status: EquipmentStatuses = EquipmentStatuses.Active;
  driverType: DriverTypes;
  type: EquipmentTypes = EquipmentTypes.Trailer;
  subType: PowerUnitTypes | TrailerTypes;
  mode: EquipmentModes = EquipmentModes.Company;
  vehicleOperating: EquipmentVehicleOperatings;
  lastTripNumber: number = 0;
  lastAddress: string = '';
  equipmentNotification: EquipmentNotification;

  static create(): Equipment {
    const result = new Equipment();
    result.id = generateNewId();
    result.status = EquipmentStatuses.Active;
    result.type = EquipmentTypes.Trailer;
    result.subType = TrailerTypes.DryVan53;
    result.mode = EquipmentModes.Company;
    result.vehicleOperating = EquipmentVehicleOperatings.InterState;
    result.driverType = DriverTypes.CompanyDriver;
    result.equipmentNotification = {
      message: '',
      date: new Date()
    };
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
