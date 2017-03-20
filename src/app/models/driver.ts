import { Equipment } from './equipment';
import { Member } from './member';
import { Address } from './address';
import { License } from './license';
import { ContactInfo } from './contact-info';
import { DriverTypes, DriverStatuses, DriverPaymentTypes } from './enums';
import { Type, Transform, Expose } from 'class-transformer';
import { generateNewId, toEnumTransformer, fromEnumTransformer } from './utils';
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
  result[DriverTypes.CompanyDriver] = 'Company driver';
  result[DriverTypes.OwnerOperator] = 'Owner operator';

  return result;
};

// Payment Type Text
function createPaymentTypeText() {
  let result = {};
  result[DriverPaymentTypes.PER_MILE] = 'Per Miles';
  result[DriverPaymentTypes.PERCENTAGE] = 'Percentage';
  result[DriverPaymentTypes.HOURLY] = 'Hourly';
  result[DriverPaymentTypes.FLAT] = 'Flat';

  return result;
};

const statusColors = createStatusColors();
const statusText = createStatusText();
const typeText = createTypeText();
const paymentTypeText = createPaymentTypeText();

export class Driver extends Member {
  dateOfBirth: Date = null;
  ssn: string = '';
  @Type(() => Equipment)
  currentTruck: Equipment = new Equipment();
  @Type(() => Equipment)
  currentTrailer: Equipment = new Equipment();
  @Type(() => Equipment)
  associatedEquipments: Array<Equipment> = [];
  @Transform(toEnumTransformer(DriverPaymentTypes), { toClassOnly: true })
  @Transform(fromEnumTransformer(DriverPaymentTypes), { toPlainOnly: true })
  @Expose({ name: 'paymentOptions' })
  paymentType: DriverPaymentTypes;
  rate: number = 0;
  type: DriverTypes = DriverTypes.CompanyDriver;
  hireDate: Date = null;
  terminationDate: Date = null;
  status: DriverStatuses = DriverStatuses.Active;
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
    result.dateOfBirth = null;
    result.hireDate = null;
    result.terminationDate = null;
    result.currentTruck = Equipment.create();
    result.currentTrailer = Equipment.create();
    result.paymentType = DriverPaymentTypes.PER_MILE;
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

  public static getPaymentTypeText(paymentType: DriverPaymentTypes): string {
    return paymentTypeText[paymentType];
  }

  public static getDriverTypes(): any {
    return typeText;
  }


};
