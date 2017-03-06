import { Equipment } from './equipment';
import { Contact } from './contact';
import { License } from './license';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { generateNewId } from './utils';

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
  @JsonMember
  dateOfBirth: Date = null;
  @JsonMember
  ssn: string = '';
  @JsonMember({ elements: Equipment })
  currentTruck: Equipment = new Equipment();
  @JsonMember({ elements: Equipment })
  currentTrailer: Equipment = new Equipment();
  @JsonMember
  paymentOption: DriverPaymentOptions;
  @JsonMember
  rate: number;
  @JsonMember
  type: DriverTypes = DriverTypes.CompanyDriver;
  @JsonMember
  hireDate: Date = null;
  @JsonMember
  terminationDate: Date = null;
  @JsonMember
  status: DriverStatuses = DriverStatuses.Active;
  @JsonMember
  notes: string = '';
  @JsonMember
  lastTripNumber: number;
  @JsonMember
  lastAddress: string = '';
  @JsonMember
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
    result.paymentOption = DriverPaymentOptions.PerMile;
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
