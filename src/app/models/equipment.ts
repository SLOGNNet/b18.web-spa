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
  result[EquipmentModes.OwnerOperator] = 'Owner Operator';

  return result;
};

// Vehicle Operatings Types
function createVehicleOperatingsText() {
  let result = {};
  result[EquipmentVehicleOperatings.InterState] = 'InterState';
  result[EquipmentVehicleOperatings.IntraState] = 'IntraState';
  return result;
}

// Power Unit types
function createPowerUnitTypes() {
  let result = {};
    result[PowerUnitTypes.Tractor] = 'Tractor';
    result[PowerUnitTypes.StraightTruck25] = 'Straight Truck 25';
    result[PowerUnitTypes.StraightTruckFlatbed] = 'Straight Truck Flatbed';
    result[PowerUnitTypes.Bus] = 'Bus';
    result[PowerUnitTypes.Other] = 'Other';
  return result;
}

// Power trailer types
function createTrailerTypes() {
  let result = {};
    result[TrailerTypes.DryVan53] = 'Dry Van 53';
    result[TrailerTypes.Reefer] = 'Reefer';
    result[TrailerTypes.DryVan48] = 'Dry Van 48';
    result[TrailerTypes.Reefer48] = 'Reefer 48';
    result[TrailerTypes.FlatBed53] = 'FlatBed 53';
    result[TrailerTypes.Other] = 'Other';
  return result;
}

const statusColors = createStatusColors();
const statusText = createStatusText();
const equipmentDriverText = createEquipmentDriverText();
const typeText = createTypeText();
const shortTypeText = createShortTypeText();
const modeText = createModeText();
const vehicleOperatings = createVehicleOperatingsText();
const powerUnitTypes = createPowerUnitTypes();
const trailerTypes = createTrailerTypes();

export class EquipmentNotification {
  message: string = '';
  date: Date;
}

export class MileageRecord {
  value: string = '';
  date: Date;
  constructor(){
    this.value = '1234';
    this.date = new Date();
  }
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
  type: EquipmentTypes = EquipmentTypes.Trailer;
  subType: PowerUnitTypes | TrailerTypes;
  ownership: EquipmentModes = EquipmentModes.Company;
  vehicleOperating: EquipmentVehicleOperatings;
  lastTripNumber: number = 0;
  lastAddress: string = '';
  equipmentNotification: EquipmentNotification;
  licensePlateState: string = '';
  licensePlateNumber: string = '';
  licensePlateExpiration: Date = null;
  isSleeperBerthAvailable: boolean = true;
  mileageRecords: Array<MileageRecord>;

  static create(): Equipment {
    const result = new Equipment();
    result.id = generateNewId();
    result.status = EquipmentStatuses.Active;
    result.type = EquipmentTypes.Trailer;
    result.subType = TrailerTypes.DryVan53;
    result.ownership = EquipmentModes.Company;
    result.vehicleOperating = EquipmentVehicleOperatings.InterState;
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

  public static getVehicleOperatingsType(type: EquipmentVehicleOperatings): string {
    return vehicleOperatings[type];
  }

  public static getEquipmentSubType(type: EquipmentTypes, subType: PowerUnitTypes | TrailerTypes ) {
    switch (type) {
      case EquipmentTypes.Trailer:
        return trailerTypes[subType];
      case EquipmentTypes.PowerUnit:
        return powerUnitTypes[subType];
      default:
      return;
    }
  }
};
