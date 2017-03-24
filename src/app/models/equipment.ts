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

// Power Unit types
function createPowerUnitTypes() {
  let result = {};
    result[PowerUnitTypes.TRACTOR] = 'Tractor';
    result[PowerUnitTypes.STRAIGHT_TRUCK_25] = 'Straight Truck 25';
    result[PowerUnitTypes.STRAIGHT_TRUCK_FLATBED] = 'Straight Truck Flatbed';
    result[PowerUnitTypes.BUS] = 'Bus';
    result[PowerUnitTypes.OTHER] = 'Other';
  return result;
}

// Power trailer types
function createTrailerTypes() {
  let result = {};
    result[TrailerTypes.DRY_VAN_53] = 'Dry Van 53';
    result[TrailerTypes.REEFER] = 'Reefer';
    result[TrailerTypes.DRY_VAN_48] = 'Dry Van 48';
    result[TrailerTypes.REEFER_48] = 'Reefer 48';
    result[TrailerTypes.FLAT_BED_53] = 'FlatBed 53';
    result[TrailerTypes.OTHER] = 'Other';
  return result;
}

const powerUnitTypes = createPowerUnitTypes();
const trailerTypes = createTrailerTypes();

export class EquipmentNotification {
  message: string = '';
  date: Date;
}

export class Mileage {
  id: string;
  value: string = '';
  date: Date;
  constructor(){
    this.id = generateNewId().toString();
    this.value = '1234';
    this.date = new Date();
  }
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
  type: EquipmentTypes = EquipmentTypes.TRAILER;
  subType: PowerUnitTypes | TrailerTypes;
  ownership: EquipmentModes = EquipmentModes.COMPANY;
  vehicleOperating: EquipmentVehicleOperatings;
  lastTripNumber: number = 0;
  lastAddress: string = '';
  equipmentNotification: EquipmentNotification;
  licensePlateState: string = '';
  licensePlateNumber: string = '';
  licensePlateExpiration: Date = null;
  isSleeperBerthAvailable: boolean = true;
  mileages: Array<Mileage>;

  static create(): Equipment {
    const result = new Equipment();
    result.id = generateNewId();
    result.status = EquipmentStatuses.ACTIVE;
    result.type = EquipmentTypes.TRAILER;
    result.subType = TrailerTypes.DRY_VAN_53;
    result.ownership = EquipmentModes.COMPANY;
    result.vehicleOperating = EquipmentVehicleOperatings.INTER_STATE;
    result.equipmentNotification = {
      message: '',
      date: new Date()
    };
    return result;
  }

  public static getEquipmentSubType(type: EquipmentTypes, subType: PowerUnitTypes | TrailerTypes ) {
    switch (type) {
      case EquipmentTypes.TRAILER:
        return trailerTypes[subType];
      case EquipmentTypes.POWER_UNIT:
        return powerUnitTypes[subType];
      default:
      return;
    }
  }
};
