import { Equipment } from './equipment';
import { Member } from './member';
import { Address } from './address';
import { License } from './license';
import { ContactInfo } from './contact-info';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { Type, Transform, Expose } from 'class-transformer';
import { generateNewId, toEnumTransformer, fromEnumTransformer } from './utils';

export class Driver extends Member {
  dateOfBirth: Date = null;
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
    result.dateOfBirth = null;
    result.hireDate = null;
    result.terminationDate = null;
    result.currentTruck = Equipment.create();
    result.currentTrailer = Equipment.create();
    result.paymentOptions = DriverPaymentOptions.PER_MILE;
    result.type = DriverTypes.COMPANY_DRIVER;
    result.status = DriverStatuses.ACTIVE;

    return result;
  }
};
