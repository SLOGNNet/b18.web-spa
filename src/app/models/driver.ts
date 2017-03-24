import { Equipment } from './equipment';
import { Member } from './member';
import { Address } from './address';
import { License } from './license';
import { ContactInfo } from './contact-info';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { Type, Transform, Expose } from 'class-transformer';
import { generateNewId,
  toEnumTransformer,
  fromEnumTransformer,
  fromMiliSecondsToDate,
  fromDateToMiliSeconds
} from './utils';

export class Driver extends Member {
  @Transform(fromMiliSecondsToDate(), { toClassOnly: true })
  @Transform(fromDateToMiliSeconds(), { toPlainOnly: true })
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
  paymentOption: DriverPaymentOptions;
  rate: number = 0;
  @Transform(toEnumTransformer(DriverTypes), { toClassOnly: true })
  @Transform(fromEnumTransformer(DriverTypes), { toPlainOnly: true })
  type: DriverTypes = DriverTypes.COMPANY_DRIVER;
  @Transform(fromMiliSecondsToDate(), { toClassOnly: true })
  @Transform(fromDateToMiliSeconds(), { toPlainOnly: true })
  hireDate: Date = null;
  terminationDate: Date = null;
  @Transform(toEnumTransformer(DriverStatuses), { toClassOnly: true })
  @Transform(fromEnumTransformer(DriverStatuses), { toPlainOnly: true })
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
    result.paymentOption = DriverPaymentOptions.PER_MILE;
    result.type = DriverTypes.COMPANY_DRIVER;
    result.status = DriverStatuses.ACTIVE;

    return result;
  }
};
