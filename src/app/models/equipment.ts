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
  result[EquipmentStatuses.NOT_AVALIABLE] = '#ffbe4d';
  result[EquipmentStatuses.ACTIVE] = '#85d183';
  result[EquipmentStatuses.INACTIVE] = '#fb3a3a';

  return result;
};

// Status Text
function createStatusText() {
  let result = {};
  result[EquipmentStatuses.NONE] = 'none';
  result[EquipmentStatuses.NOT_AVALIABLE] = 'not avaliable';
  result[EquipmentStatuses.ACTIVE] = 'active';
  result[EquipmentStatuses.INACTIVE] = 'inactive';

  return result;
};

// Driver Text
function createEquipmentDriverText() {
  let result = {};
  result[DriverTypes.COMPANY_DRIVER] = 'Company Driver';
  result[DriverTypes.OWNER_OPERATOR] = 'Owner Operator';

  return result;
};

// Type Text
function createTypeText() {
  let result = {};
  result[EquipmentTypes.NONE] = 'None';
  result[EquipmentTypes.TRAILER] = 'Trailer';
  result[EquipmentTypes.POWER_UNIT] = 'PowerUnit';

  return result;
};

// Short Type Text
function createShortTypeText() {
  let result = {};
  result[EquipmentTypes.NONE] = 'None';
  result[EquipmentTypes.TRAILER] = 'TL';
  result[EquipmentTypes.POWER_UNIT] = 'TK';

  return result;
};

// Mode Text
function createModeText() {
  let result = {};
  result[EquipmentModes.NONE] = 'None';
  result[EquipmentModes.COMPANY] = 'Company';

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
  id: string = '';
  make: string = 'Kenworth';
  model: string = 'T610';
  number: string = '101';
  vin: string = '';
  notes: string = 'Oil Change';
  @Type(() => Driver)
  driver: Driver;
  status: EquipmentStatuses = EquipmentStatuses.ACTIVE;
  driverType: DriverTypes;
  type: EquipmentTypes = EquipmentTypes.TRAILER;
  subType: PowerUnitTypes | TrailerTypes;
  mode: EquipmentModes = EquipmentModes.COMPANY;
  vehicleOperating: EquipmentVehicleOperatings;
  lastTripNumber: number = 0;
  lastAddress: string = '';
  equipmentNotification: EquipmentNotification;

  static create(): Equipment {
    const result = new Equipment();
    result.id = generateNewId();
    result.status = EquipmentStatuses.ACTIVE;
    result.type = EquipmentTypes.TRAILER;
    result.subType = TrailerTypes.DRY_VAN_53;
    result.mode = EquipmentModes.COMPANY;
    result.vehicleOperating = EquipmentVehicleOperatings.INTER_STATE;
    result.driverType = DriverTypes.COMPANY_DRIVER;
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
