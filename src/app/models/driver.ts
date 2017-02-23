import { Equipment } from './equipment';
import { Contact } from './contact';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

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
export class Driver {
  @JsonMember
  id: number = 0;
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
  @JsonMember({ elements: Contact })
  contact: Contact = new Contact();
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
  phone: string = '';
  @JsonMember
  lastTripNumber: number;
  @JsonMember
  lastAddress: string = '';


  static create(): Driver {
    const result = new Driver();
    result.dateOfBirth = new Date();
    result.hireDate = new Date();
    result.terminationDate = new Date();
    result.currentTruck = Equipment.create();
    result.currentTrailer = Equipment.create();
    result.paymentOption = DriverPaymentOptions.PerMile;
    result.contact = Contact.create();
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
