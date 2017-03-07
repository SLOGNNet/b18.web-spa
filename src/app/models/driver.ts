import { Equipment } from './equipment';
import { Contact } from './contact';
import { License } from './license';
import { DriverTypes, DriverStatuses, DriverPaymentTypes } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { generateNewId } from './utils';
import { Type } from 'class-transformer';
// Colors
function createStatusColors() {
  let result = {};
  result[DriverStatuses.Unavaliable] = '#ffbe4d';
  result[DriverStatuses.Active] = '#85d183';
  result[DriverStatuses.Inactive] = '#fb3a3a';

  return result;
};

// Status Text
function createStatusText() {
  let result = {};
  result[DriverStatuses.None] = 'none';
  result[DriverStatuses.Unavaliable] = 'unavaliable';
  result[DriverStatuses.Active] = 'active';
  result[DriverStatuses.Inactive] = 'inactive';

  return result;
};

// Type Text
function createTypeText() {
  let result = {};
  result[DriverTypes.None] = 'None';
  result[DriverTypes.CompanyDriver] = 'Company driver';
  result[DriverTypes.OwnerOperator] = 'Owner operator';

  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const typeText = createTypeText();

@JsonObject
export class Driver extends Contact {
  dateOfBirth: Date = null;
  ssn: string = '';
  @Type(() => Equipment)
  currentTruck: Equipment = new Equipment();
  @Type(() => Equipment)
  currentTrailer: Equipment = new Equipment();
  @Type(() => Equipment)
  associatedEquipment: Array<Equipment>;
  paymentType: DriverPaymentTypes;
  rate: number;
  type: DriverTypes = DriverTypes.CompanyDriver;
  hireDate: Date = null;
  terminationDate: Date = null;
  status: DriverStatuses = DriverStatuses.Active;
  notes: string = '';
  lastTripNumber: number;
  lastAddress: string = '';
  @Type(() => License)
  license: License;

  static create(): Driver {
    const result = new Driver();
    result.id = generateNewId();
    result.license = new License();
    result.dateOfBirth = new Date();
    result.hireDate = new Date();
    result.terminationDate = new Date();
    result.currentTruck = Equipment.create();
    result.currentTrailer = Equipment.create();
    result.paymentType = DriverPaymentTypes.PerMile;
    result.type = DriverTypes.CompanyDriver;
    result.status = DriverStatuses.Active;
    return result;
  }

  public static getStatusText(status: DriverStatuses): string {
    return statusText[status];
  }

  public static getStatusColor(status: DriverStatuses): string {
    return statusColors[status];
  }

  public static getTypeText(type: DriverTypes): string {
    return typeText[type];
  }
};
