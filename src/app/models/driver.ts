import { Equipment } from './equipment';
import { Member } from './member';
import { Address } from './address';
import { License } from './license';
import { ContactInfo } from './contact-info';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { Type, Transform, Expose } from 'class-transformer';
import { generateNewId, toEnumTransformer, fromEnumTransformer } from './utils';
// Colors
function createStatusColors() {
  let result = {};
  result[DriverStatuses.UNAVALIABLE] = '#ffbe4d';
  result[DriverStatuses.ACTIVE] = '#85d183';
  result[DriverStatuses.INACTIVE] = '#fb3a3a';

  return result;
};

// Status Text
function createStatusText() {
  let result = {};
  result[DriverStatuses.NONE] = 'none';
  result[DriverStatuses.UNAVALIABLE] = 'unavaliable';
  result[DriverStatuses.ACTIVE] = 'active';
  result[DriverStatuses.INACTIVE] = 'inactive';

  return result;
};

// Type Text
function createTypeText() {
  let result = {};
  result[DriverTypes.COMPANY_DRIVER] = 'Company driver';
  result[DriverTypes.OWNER_OPERATOR] = 'Owner operator';

  return result;
};

// Payment Type Text
function createPaymentTypeText() {
  let result = {};
  result[DriverPaymentOptions.PER_MILE] = 'Per Miles';
  result[DriverPaymentOptions.PERCENTAGE] = 'Percentage';
  result[DriverPaymentOptions.HOURLY] = 'Hourly';
  result[DriverPaymentOptions.FLAT] = 'Flat';

  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const typeText = createTypeText();
const paymentTypeText = createPaymentTypeText();

export class Driver extends Member {
  birthDate: Date = null;
  ssn: string = '';
  @Type(() => Equipment)
  currentTruck: Equipment = new Equipment();
  @Type(() => Equipment)
  currentTrailer: Equipment = new Equipment();
  @Type(() => Equipment)
  associatedEquipments: Array<Equipment> = [];
  @Transform(toEnumTransformer(DriverPaymentOptions), { toClassOnly: true })
  @Transform(fromEnumTransformer(DriverPaymentOptions), { toPlainOnly: true })
  paymentOptions: DriverPaymentOptions;
  rate: number = 0;
  type: DriverTypes = DriverTypes.COMPANY_DRIVER;
  hireDate: Date = null;
  terminationDate: Date = null;
  status: DriverStatuses = DriverStatuses.ACTIVE;
  notes: string = '';
  lastTripNumber: number = 0;
  lastAddress: string = '';
  @Type(() => License)
  license: License;

  static create(): Driver {
    const result = new Driver();
    result.id = generateNewId();
    result.address = Address.create();
    result.contactInfo = ContactInfo.сreateDefaultList();
    result.license = License.create();
    result.birthDate = null;
    result.hireDate = null;
    result.terminationDate = null;
    result.currentTruck = Equipment.create();
    result.currentTrailer = Equipment.create();
    result.paymentOptions = DriverPaymentOptions.PER_MILE;
    result.type = DriverTypes.COMPANY_DRIVER;
    result.status = DriverStatuses.ACTIVE;

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

  public static getPaymentTypeText(paymentType: DriverPaymentOptions): string {
    return paymentTypeText[paymentType];
  }

  public static getDriverTypes(): any {
    return typeText;
  }


};
