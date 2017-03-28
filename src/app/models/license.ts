import { LicenseClassTypes } from './enums';
import { generateNewId,
  toEnumTransformer,
  fromEnumTransformer,
  fromMiliSecondsToDate,
  fromDateToMiliSeconds
} from './utils';
import { Type, Transform, Expose } from 'class-transformer';

export class License {
  id: string = '';
  number: string = '';
  @Transform(fromMiliSecondsToDate(), { toClassOnly: true })
  @Transform(fromDateToMiliSeconds(), { toPlainOnly: true })
  expiration: Date = null;
  @Transform(fromMiliSecondsToDate(), { toClassOnly: true })
  @Transform(fromDateToMiliSeconds(), { toPlainOnly: true })
  dateIssued: Date = null;
  stateIssued: string = '';
  @Transform(toEnumTransformer(LicenseClassTypes), { toClassOnly: true })
  @Transform(fromEnumTransformer(LicenseClassTypes), { toPlainOnly: true })
  licenseClass: LicenseClassTypes;
  endorsements: string = '';
  restrictions: string = '';

  static create(): License {
    const result = new License();
    result.expiration = null;
    result.dateIssued = null;
    result.licenseClass = LicenseClassTypes.NONE;
    return result;
  }
}
